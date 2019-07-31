import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }

  }
  componentDidMount() {
    const cors = 'https://cors-anywhere.herokuapp.com/'
    const key = 'MjYyZjMwODctYTEwYy00YTdiLTg4NWEtOTNlODQ3MmI0YmE3Og=='
    const url = cors + 'https://www.reed.co.uk/api/1.0/search?keywords=accountant&location=london&distancefromlocation=15'
    axios.get(url, {
      headers: { Authorization: `Basic ${key}` }
    })
      .then(res => {
        this.setState({ data: res.data })
        console.log(res)
      }
      )
      .catch(err => console.log(err))
  }

  render() {
    return (
      <main>

        <h1>hello World</h1>

      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)