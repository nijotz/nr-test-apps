'use strict'

function namesAndDepths(nodes, depth = 1) {
  const childNodes = nodes.map(node => {
    if (node.kind === 'OperationDefinition' || node.kind === 'Field') {
      const name = node.name ? node.name.value : 'query'
      const children = node.selectionSet ? node.selectionSet.selections : null

      // The "leaf" of the branch. This can return multiple names/depths, like
      // when a query has many fields being pulled for an object type
      if (!children) {
        return { name, depth }
      }

      const childNamesAndDepths = namesAndDepths(children, depth + 1).map(nameAndDepth => {
        nameAndDepth.name = `${name}.${nameAndDepth.name}`
        return nameAndDepth
      })

      return childNamesAndDepths
    }

    // TODO: what else is there??
  })

  return childNodes.flat()
}

function deepestPath(context) {
  const definitions = context.document.definitions
  const names = namesAndDepths(definitions)
  const deepestChild = names.reduce((deepest, current) => {
    if (current.depth > deepest.depth) {
      return current
    }
    return deepest
  })

  return deepestChild
}

const shimPlugin = (options) => {
  const nr = options.newrelic
  return {
    requestDidStart(context) {
      const shim = nr.shim
      const segmentMap = new Map()

      const segmento = nr.agent.tracer.getSegment()
      segmento.name = `Operation: ${context.operationName}`
      const sego = {
        segment: segmento,
        name: segmento.name
      }

      shim.setActiveSegment(segmento)

      segmentMap.set('root', sego)

      return {
        didResolveOperation(context) {
          let name = context.operationName
          if (!name) {
            name = deepestPath(context).name
          }
          console.log('name', name)
          segmentMap.get('root').segment.name = `Operation: ${name}`
        },
        executionDidStart: () => ({
          willResolveField({info, context}) {
            if (isQueryOrMutation(info.parentType)) {
              // get root segment to add as parent to Query segment
              const rootSeg = segmentMap.get('root').segment
              const name = `${info.parentType}: ${info.fieldName}`

              const seg = {
                segment: shim.createSegment(name, rootSeg),
                name: info.fieldName
              }

              seg.segment.start()
              shim.setActiveSegment(seg.segment)

              segmentMap.set(info.fieldName, seg)
            }

            return () => {
              if (isQueryOrMutation(arguments[0].info.parentType)) {
                const seg = segmentMap.get(info.fieldName).segment

                if (seg) {
                  seg.end()
                  const rootSeg = segmentMap.get('root').segment
                  shim.setActiveSegment(rootSeg)
                }
              }
            }
          }
        }),
      }
    }
  }
}

const isQueryOrMutation = (type) => {
  return type + '' === 'Query' || type + '' === 'Mutation'
}

module.exports = shimPlugin
