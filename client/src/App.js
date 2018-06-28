import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { client } from "./graphql";
import { Navbar, Users, Posts, Todos, Comments, UserDetails } from "./components";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={ client }>
          <div className="App">
            <Navbar />
            <div id="content">
              <Switch>
                <Route path="/" exact component={ Users }/>
                <Route path="/users/:id" exact component={ UserDetails }/>
                <Redirect from="/users" to="/" />
                <Route path="/posts/:userId" exact component={ Posts }/>
                <Route path="/posts" exact component={ Posts }/>
                <Route path="/todos/:userId" exact component={ Todos }/>
                <Route path="/todos" exact component={ Todos }/>
                <Route path="/comments" exact component={ Comments }/>
              </Switch>
            </div>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
