// internal
import * as React from 'react'
import { Header } from './Header'
import { List } from './List'
import { About } from './About'
import { Post } from './Post'

// vendors
import { BrowserRouter as Router, Route } from 'react-router-dom'

export const Home = () => (
  <Router>
    <div>
      <Header />
      <Route path='/' exact component={List} />
      <Route path='/about' component={About} />
      <Route path='/post/:url' component={Post} />
    </div>
  </Router>
)
