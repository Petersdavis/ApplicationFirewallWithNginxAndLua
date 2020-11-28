import React, { Component } from 'react';
import Home from './pages/home';
import ViewArticle from './pages/view-article';
import EditArticle from './pages/edit-article';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/edit/:name" render={(props) => (
                <EditArticle {...props} fetch={fetch.bind(window)} />
              )}></Route>
          <Route path="/:name"  render={(props) => (
                <ViewArticle {...props} fetch={fetch.bind(window)} />
              )}
              ></Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
