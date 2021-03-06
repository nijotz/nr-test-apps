```
put New Relic license in docker-compose.yml

docker-compose up

# Example React app
http://localhost:3000/

# GraphQL playground
http://localhost:4000/

# A query that hits two resolvers
{
  authors {
    id
    name
    bio
    views
  }
  posts {
    id
    title
    text
    views
  }
}

# A query for one author (with custom date formatting)
{
  author(id: 2) {
    id
    name
    bio
    views
    created_date(format: "dd/mm/yy")
    posts {
      id
      title
      text
    }
  }
}

# A query for one post
{
  post(id: 1) {
    id
    text
    title
    views
    created_date
    author {
      name
      bio
    }
  }
}

# A search query
{
  search(contains: "moth") {
    ... on Post {
      id
      title
      text
      views
    }
    ... on Author {
      id
      name
      bio
      views
    }
  }
}

# A query that will trigger an error (use ID 13 on an author/post)
{
  author(id: 13) {
    id
    name
    bio
    views
    created_date(format: "dd/mm/yy")
  }
}

# A mutation (top part is the operation, bottom part is the "Query Variables"
mutation updateAuthor($id:ID!, $name:String, $bio:String) {
  updateAuthor(id:$id, name:$name, bio:$bio) {
    id
    name
    bio
  }
}

{
  "id": 1,
  "name": "test"
  "bio": "a new bio"
}

# Query batching via curl
curl -s 'http://localhost:4000/' -H 'Content-Type: application/json' --data-binary '[{"query":"query getAuthors {\n  authors {\n    id\n    name\n    bio\n  }\n}\n\n"}, {"query": "query getPosts {\n  posts {\n    id\n    title\n    text\n  }\n}"}]' | python -m json.tool

# Destroy every Docker image on my machine
# (instead of fixing the leaky sink, just destroy the entire house)
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker images -a | awk '{print $3}' | xargs docker rmi -f

# Remove the database
rm -rf db/data/

# Rebuild
docker-compose up
```
