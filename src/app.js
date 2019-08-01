import React from 'react'
import ReactDOM from 'react-dom'
// import axios from 'axios'
// import Card from './components/Card'
// import Input from './components/Index'
import { Link, HashRouter, Switch, Route } from 'react-router-dom'
import IndexPage from './components/Index'
import FormPage from './components/Form'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/search' component={IndexPage} />
          <Route path='/' component={FormPage} />
        </Switch>
      </HashRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
