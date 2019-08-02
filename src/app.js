import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import IndexPage from './components/Index'
import FormPage from './components/Form'
import ResultsPage from './components/Results'
import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <figure className="image">
          <img src="../../assets/El Camello - Banner.png" alt={this.props.EventName} />
        </figure>
        <Switch>
          <Route exact path='/results/:keyword/:location' component={ResultsPage} />
          <Route exact path='/search' component={IndexPage} />
          <Route path='/test' component={ResultsPage} />
          <Route path='/' component={FormPage} />
        </Switch>
      </HashRouter >

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
