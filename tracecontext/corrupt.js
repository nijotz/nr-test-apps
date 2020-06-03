const request = require('request')

const options = {
  url: 'http://localhost:3000',
  headers: {
    traceparent: "00-74be672b84ddc4e4b28be285632bbc0a-27ddd2d8890283b4-01",
    tracestate: "1349956@nr=0-0-1349956-41346604-27ddd2d8890283b4-B28BE285632BBC0A-1-1.1273-1569367663277"
  }
}
request.get(options)
