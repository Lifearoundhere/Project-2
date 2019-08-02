import React from 'react'
import axios from 'axios'
import Card from './Card'
import CardEvent from './CardEvent'
import _ from 'lodash'


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

  // filterSearch() {
  //   const [field, order] = this.state.sorting.split('|')
  //   const regex = new RegExp(this.state.searchStr, 'i')
  //   const filterJobs = _.filter(this.state.data, job => {
  //     return regex.test(job.jobTitle) || regex.test(job.locationName)
  //   })
  //   const sortedJobs = _.orderBy(filterJobs, [field], [order])
  //   console.log(filterJobs)
  //   return sortedJobs
  // }

  render() {
    console.log(this.state.results)
    if (!this.state.data) return <div className="button is-loading" ></div>
    return (
      <div>
        <label>
          Search:
          <input type="text" name="Search"
            onKeyUp={this.handleChange}
          />
        </label>
        <select onChange={this.handleSort}>
          <option selected value="date|desc">Date|Last - First</option>
          <option value="date|asc">Date|First - Last</option>
          <option value="applicantions|desc">NoOfApplicants|High-Low</option>
          <option value="applicantions|asc">NoOfApplicants|Low-High</option>
        </select>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.data.map(job => {
                if (job.isB) {
                  return (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" key={job.Id}
                      className="column is-full-tablet is-half-desktop"
                    >
                      <CardEvent
                        name={job.name.text}
                        EventImage={job.logo.original.url}
                        eventDate={job.start.local}
                      />
                    </a>
                  )
                } else {
                  return (
                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" key={job.jobId}
                      className="column is-full-tablet is-half-desktop"
                    >

                      <Card
                        key={job.jobId}
                        jobTitle={job.jobTitle}
                        employerName={job.employerName}
                        locationName={job.locationName}
                        minimumSalary={job.minimumSalary}
                        maximumSalary={job.maximumSalary}
                        currency={job.currency}
                        expirationDate={job.expirationDate}
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
