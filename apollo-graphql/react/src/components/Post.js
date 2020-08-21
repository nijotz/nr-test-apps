import React from 'react'
import { useQuery, gql } from "@apollo/client"

function Home(props) {
  const id = props.match.params.id
  const { loading, error, data } = useQuery(gql`
    {
      post(id: ${id}) {
        title
        text
        author {
          id
          name
          bio
        }
      }
    }`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <div className="Post">
      <h1>{data.post.title}</h1>
      <h2>by {data.post.author.name}</h2>
      <p>{data.post.text}</p>
    </div>
  )
}

export default Home
