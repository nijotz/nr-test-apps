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
  author(id: 2) {
    id
    name
    bio
    views
    created_date(format: "dd/mm/yy")
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
