import React from 'react'
import axios from 'axios'
import Card from './Card'
import CardEvent from './CardEvent'
import _ from 'lodash'
import { Link } from 'react-router-dom'



class Results extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
      data: [],
      searchStr: '',
      sorting: 'date|desc'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  sortOutMyResults(newResults, index) {
    const oldResults = this.state.data
    if (index === 'isB') {
      newResults.map(obj => obj.isB = true)
      newResults.map(obj => obj.newName = obj.name.html)
      newResults.map(obj => obj.date = (new Date(obj.start.local)).toDateString())
    }
    // oldResults.concat(newResults)
    console.log(newResults)
    this.setState({ data: [...oldResults, ...[...newResults]] })
  }

  handleChange(e) {
    this.setState({ searchStr: e.target.value })
  }
  handleSort(e) {
    this.setState({ sorting: e.target.value })
  }

  fetchReed() {
    const key = process.env.REED_KEY
    axios.get('https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0/search', {
      params: {
        keywords: this.props.match.params.keyword,
        location: this.props.match.params.location,
        distancefromlocation: 10
      },
      headers: { Authorization: `Basic ${key}` }
    })
      .then(res => {


        this.setState({ results: this.sortOutMyResults(res.data.results, 'isA') })
      })
      .catch(err => console.log(err))
  }

  fetchEventbrite() {
    const key = process.env.EVENT_BITE_KEY
    axios.get('https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?', {
      params: {
        token: key,
        'location.address': this.props.match.params.location,
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

  filterSearch() {
    const [field, order] = this.state.sorting.split('|')
    const regex = new RegExp(this.state.searchStr, 'i')
    const filterJobs = _.filter(this.state.data, job => {
      return regex.test(job.jobTitle) || regex.test(job.locationName) || regex.test(job.newName) || regex.test(job.isB)
    })
    const sortedJobs = _.orderBy(filterJobs, [field], [order])

    return _.shuffle(sortedJobs)
  }


  render() {
    console.log(this.filterSearch())
    if (!this.state.data) return <div className="button is-loading" ></div>
    return (
      <div className="container-1">

        <div className="field columns is-centered">
          <form>
            <div className="column field">
              <label className="label is-size-4">Search:</label>
              <div>
                <input
                  className="input is-medium is-hovered"
                  type="text"
                  name="Search"
                  placeholder="keyword"
                  onChange={this.handleChange}
                />
              </div>
              <div className="column field">
                <select className="label is-size-4" onChange={this.handleSort}>
                  <option selected value="date|desc">Date | Last - First</option>
                  <option value="date|asc">Date | First - Last</option>
                  <option value="applicantions|desc">No. of Applicants | High-Low</option>
                  <option value="applicantions|asc">No. of Applicants | Low-High</option>
                </select>
              </div>
            </div>
            <div className="is-centered">
              <Link to="/" className="button is-link is-large">New Search</Link>
            </div>
          </form>
        </div>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {this.filterSearch().map(job => {
                if (job.isB) {
                  return (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" key={job.Id}
                      className="column is-half-tablet is-one-third-desktop"
                    >
                      <CardEvent
                        name={job.newName}
                        EventImage={job.logo.original.url}
                        eventDate={job.date}
                      />
                    </a>
                  )
                } else {
                  return (
                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" key={job.jobId}
                      className="column is-half-tablet is-one-third-desktop"
                    >

                      <Card
                        key={job.jobId}
                        jobTitle={job.jobTitle}
                        employerName={job.employerName}
                        locationName={job.locationName}
                        minimumSalary={job.minimumSalary}
                        maximumSalary={job.maximumSalary}
                        currency={job.currency}
                        date={job.date}
                        jobDescription={job.jobDescription}
                      />

                    </a>
                  )
                }
              })}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default Results
