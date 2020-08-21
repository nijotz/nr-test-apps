import React from 'react'
import { useQuery, gql } from "@apollo/client"

function Home() {
  const { loading, error, data } = useQuery(gql`
    {
      posts {
        id
        title
      }
    }`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <div className="Home">
      <h1>Home</h1>
      <ul>
        {data.posts.map(post =>
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Home
