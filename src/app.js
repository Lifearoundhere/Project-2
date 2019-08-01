import React from 'react'
import ReactDOM from 'react-dom'
// import axios from 'axios'
// import Card from './components/Card'
// import Input from './components/Index'
import { Link, HashRouter, Switch, Route } from 'react-router-dom'
import IndexPage from './components/Index'
import FormPage from './components/Form'
import ResultsPage from './components/Results'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/results/:keyword/:location' component={IndexPage} />
          <Route exact path='/search' component={IndexPage} />
          <Route path='/test' component={ResultsPage} />
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
