import React from 'react'
import Card from './Card'
import _ from 'lodash'
import axios from 'axios'

class IndexPage extends React.Component {
  constructor() {
    super()

    this.state = {
      data: []
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
        this.setState({ data: res.data.results })
      })
      .catch(err => console.log(err))
  }


  render() {
    console.log(this.state.data)
    return (
      <div>
        <label>
          Search:
          <input type="text" name="Search" />
        </label>
        <select>
          <option selected value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="High-Low">High-Low</option>
          <option value="Low-High">Low-High</option>
        </select>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.data.map(job =>
                <div key={job.jobId} className="column is-full-tablet is-half-desktop">
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
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default IndexPage 