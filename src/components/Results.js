import React from 'react'
import axios from 'axios'


class Results extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
      data: []
    }
  }

  sortOutMyResults(newResults, index) {
    const oldResults = this.state.data
    if (index === 'isB') {
      newResults.map(obj => obj.isB = true)
    }
    // oldResults.concat(newResults)
    console.log(newResults)
    this.setState({ data: [...oldResults, ...[...newResults]] })
  }

  fetchReed() {
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


        this.setState({ results: this.sortOutMyResults(res.data.results, 'isA') })
      })
      .catch(err => console.log(err))
  }

  fetchEventbrite() {
    const key = 'K7HAXKBZLB3XYVDES2VN'
    axios.get('https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?', {
      params: {
        token: key,
        'location.address': 'London',
        'location.within': '10km',
        expand: 'venue',
        categories: '101,102'

      },
      headers: { Authorization: `Bearer ${key}` }
    })

      .then(res => {
        console.log(res.data.events)
        this.setState({ results: this.sortOutMyResults(res.data.events, 'isB') })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchReed()
    this.fetchEventbrite()
  }

  render() {
    console.log(this.state.results)
    return (
      <section className="section">
        <div className="container">
          {/* {this.state.results.map(event =>
            <h1 key={event.id}>{event.name.text}</h1>
          )} */}
        </div>
      </section>
    )
  }
}
export default Results
