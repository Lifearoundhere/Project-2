import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Card from './components/Card'
import Input from './components/Input'



class App extends React.Component {
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
      <section className="section">
        <Input />
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
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
