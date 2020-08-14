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

example tracing data in the response:
```
{
    "extensions": {
        "tracing": {
            "version": 1,
            "startTime": "2020-08-14T16:50:48.292Z",
            "endTime": "2020-08-14T16:50:48.349Z",
            "duration": 57357600,
            "execution": {
                "resolvers": [
                    {
                        "path": [
                            "authors"
                        ],
                        "parentType": "Query",
                        "fieldName": "authors",
                        "returnType": "[Author]!",
                        "startOffset": 839200,
                        "duration": 55119600
                    },
                    {
                        "path": [
                            "posts"
                        ],
                        "parentType": "Query",
                        "fieldName": "posts",
                        "returnType": "[Post]!",
                        "startOffset": 1285300,
                        "duration": 55552900
                    },
                    {
                        "path": [
                            "authors",
                            0,
                            "id"
                        ],
                        "parentType": "Author",
                        "fieldName": "id",
                        "returnType": "Int",
                        "startOffset": 56034800,
                        "duration": 40900
                    },
                    {
                        "path": [
                            "authors",
                            0,
                            "name"
                        ],
                        "parentType": "Author",
                        "fieldName": "name",
                        "returnType": "String",
                        "startOffset": 56099200,
                        "duration": 25400
                    },
                    {
                        "path": [
                            "authors",
                            0,
                            "bio"
                        ],
                        "parentType": "Author",
                        "fieldName": "bio",
                        "returnType": "String",
                        "startOffset": 56143300,
                        "duration": 26700
                    },
                    {
                        "path": [
                            "authors",
                            0,
                            "views"
                        ],
                        "parentType": "Author",
                        "fieldName": "views",
                        "returnType": "Int",
                        "startOffset": 56186800,
                        "duration": 22000
                    },
                    {
                        "path": [
                            "authors",
                            1,
                            "id"
                        ],
                        "parentType": "Author",
                        "fieldName": "id",
                        "returnType": "Int",
                        "startOffset": 56234900,
                        "duration": 18200
                    },
                    {
                        "path": [
                            "authors",
                            1,
                            "name"
                        ],
                        "parentType": "Author",
                        "fieldName": "name",
                        "returnType": "String",
                        "startOffset": 56267800,
                        "duration": 24500
                    },
                    {
                        "path": [
                            "authors",
                            1,
                            "bio"
                        ],
                        "parentType": "Author",
                        "fieldName": "bio",
                        "returnType": "String",
                        "startOffset": 56308600,
                        "duration": 20100
                    },
                    {
                        "path": [
                            "authors",
                            1,
                            "views"
                        ],
                        "parentType": "Author",
                        "fieldName": "views",
                        "returnType": "Int",
                        "startOffset": 56346000,
                        "duration": 19800
                    },
                    {
                        "path": [
                            "authors",
                            2,
                            "id"
                        ],
                        "parentType": "Author",
                        "fieldName": "id",
                        "returnType": "Int",
                        "startOffset": 56389700,
                        "duration": 17900
                    },
                    {
                        "path": [
                            "authors",
                            2,
                            "name"
                        ],
                        "parentType": "Author",
                        "fieldName": "name",
                        "returnType": "String",
                        "startOffset": 56422400,
                        "duration": 19200
                    },
                    {
                        "path": [
                            "authors",
                            2,
                            "bio"
                        ],
                        "parentType": "Author",
                        "fieldName": "bio",
                        "returnType": "String",
                        "startOffset": 56454200,
                        "duration": 16800
                    },
                    {
                        "path": [
                            "authors",
                            2,
                            "views"
                        ],
                        "parentType": "Author",
                        "fieldName": "views",
                        "returnType": "Int",
                        "startOffset": 56485900,
                        "duration": 16900
                    },
                    {
                        "path": [
                            "posts",
                            0,
                            "id"
                        ],
                        "parentType": "Post",
                        "fieldName": "id",
                        "returnType": "Int",
                        "startOffset": 56887800,
                        "duration": 24200
                    },
                    {
                        "path": [
                            "posts",
                            0,
                            "title"
                        ],
                        "parentType": "Post",
                        "fieldName": "title",
                        "returnType": "String",
                        "startOffset": 56927500,
                        "duration": 20000
                    },
                    {
                        "path": [
                            "posts",
                            0,
                            "text"
                        ],
                        "parentType": "Post",
                        "fieldName": "text",
                        "returnType": "String",
                        "startOffset": 56960600,
                        "duration": 16800
                    },
                    {
                        "path": [
                            "posts",
                            0,
                            "views"
                        ],
                        "parentType": "Post",
                        "fieldName": "views",
                        "returnType": "Int",
                        "startOffset": 56992200,
                        "duration": 17200
                    },
                    {
                        "path": [
                            "posts",
                            1,
                            "id"
                        ],
                        "parentType": "Post",
                        "fieldName": "id",
                        "returnType": "Int",
                        "startOffset": 57038000,
                        "duration": 19800
                    },
                    {
                        "path": [
                            "posts",
                            1,
                            "title"
                        ],
                        "parentType": "Post",
                        "fieldName": "title",
                        "returnType": "String",
                        "startOffset": 57072700,
                        "duration": 17000
                    },
                    {
                        "path": [
                            "posts",
                            1,
                            "text"
                        ],
                        "parentType": "Post",
                        "fieldName": "text",
                        "returnType": "String",
                        "startOffset": 57104100,
                        "duration": 16900
                    },
                    {
                        "path": [
                            "posts",
                            1,
                            "views"
                        ],
                        "parentType": "Post",
                        "fieldName": "views",
                        "returnType": "Int",
                        "startOffset": 57136300,
                        "duration": 19600
                    },
                    {
                        "path": [
                            "posts",
                            2,
                            "id"
                        ],
                        "parentType": "Post",
                        "fieldName": "id",
                        "returnType": "Int",
                        "startOffset": 57174400,
                        "duration": 19700
                    },
                    {
                        "path": [
                            "posts",
                            2,
                            "title"
                        ],
                        "parentType": "Post",
                        "fieldName": "title",
                        "returnType": "String",
                        "startOffset": 57208800,
                        "duration": 17200
                    },
                    {
                        "path": [
                            "posts",
                            2,
                            "text"
                        ],
                        "parentType": "Post",
                        "fieldName": "text",
                        "returnType": "String",
                        "startOffset": 57240600,
                        "duration": 17100
                    },
                    {
                        "path": [
                            "posts",
                            2,
                            "views"
                        ],
                        "parentType": "Post",
                        "fieldName": "views",
                        "returnType": "Int",
                        "startOffset": 57270100,
                        "duration": 19400
                    }
                ]
            }
        }
    }
}
```
