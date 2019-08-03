import React from 'react'
import Card from './Card'
import _ from 'lodash'
import axios from 'axios'
// import { Link } from "react-router-dom"

class IndexPage extends React.Component {
  constructor() {
    super()

    this.state = {
      data: [],
      searchStr: '',
      sorting: 'date|desc'

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }
  componentDidMount() {
    const key = process.env.REED_KEY
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
  handleChange(e) {
    this.setState({ searchStr: e.target.value })
  }
  handleSort(e) {
    this.setState({ sorting: e.target.value })
  }

  filterSearch() {
    const [field, order] = this.state.sorting.split('|')
    const regex = new RegExp(this.state.searchStr, 'i')
    const filterJobs = _.filter(this.state.data, job => {
      return regex.test(job.jobTitle) || regex.test(job.locationName)
    })
    const sortedJobs = _.orderBy(filterJobs, [field], [order])
    console.log(filterJobs)
    return sortedJobs
  }

  render() {
    console.log(this.state.searchStr)
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
              {this.filterSearch().map(job =>
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
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default IndexPage
