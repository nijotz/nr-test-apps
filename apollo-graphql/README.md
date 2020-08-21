```
put New Relic license in docker-compose.yml

docker-compose up

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

# A query for one author
{
  author(id: 1) {
    id
    name
    bio
    views
  }
}

# A query for one post
{
  post(id: 1) {
    id
    text
    title
    views
  }
}

# Query batching via curl
curl -s 'http://localhost:4000/' -H 'Content-Type: application/json' --data-binary '[{"query":"query getAuthors {\n  authors {\n    id\n    name\n    bio\n  }\n}\n\n"}, {"query": "query getPosts {\n  posts {\n    id\n    title\n    text\n  }\n}"}]' | python -m json.tool
```
