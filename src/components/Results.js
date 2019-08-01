import React from 'react'
import axios from 'axios'


class Results extends React.Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
  }

  componentDidMount() {
    const key = 'K7HAXKBZLB3XYVDES2VN'
    axios.get('https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?location.address=vancovuer&location.within=10km&expand=venue', {
      params: {
        token: key
      },
      headers: { Authorization: `Bearer ${key}` }
    })
      .then(res => {
        this.setState({ results: res.data.events })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          {this.state.results.map(event =>
            <h1 key={event.id}>{event.name.text}</h1>
          )}
        </div>
      </section>
    )
  }
}
export default Results
