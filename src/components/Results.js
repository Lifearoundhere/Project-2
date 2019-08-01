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
    const key = 'MjYyZjMwODctYTEwYy00YTdiLTg4NWEtOTNlODQ3MmI0YmE3Og=='
    axios.get('https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0/search', {
      params: {
        keywords: this.props.match.params.keyword,
        location: this.props.match.params.location,
        distancefromlocation: 15
      },
      headers: { Authorization: `Basic ${key}` }
    })
      .then(res => {
        this.setState({ data: res.data.results })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section className="section">
        <div className="container">

        </div>
      </section>
    )
  }
}
export default Results
