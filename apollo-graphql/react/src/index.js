import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Post from './components/Post'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

render(
  <ApolloProvider client={client}>
    <NavBar />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
