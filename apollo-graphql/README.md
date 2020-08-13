```
put New Relic license in docker-compose.yml

docker-compose up

http://localhost:4000/

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

{
  author(id: 1) {
    id
    name
    bio
    views
  }
}

{
  post(id: 1) {
    id
    text
    title
    views
  }
}
```
