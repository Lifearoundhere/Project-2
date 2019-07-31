import React from 'react'
class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title is-2">{this.props.jobTitle}</div>
          <div className="title is-4">{this.props.employerName}</div>
          <div className="subtitle is-6">Location: {this.props.locationName}</div>
        </div>
        <div className="card-content">
          <div className="subtitle is-6">Salary: {this.props.minimumSalary} {this.props.currency} - {this.props.maximumSalary} {this.props.currency}</div>
          <div className="subtitle is-6">Apply before: {this.props.expirationDate}</div>
          <div className="content is-small">{this.props.jobDescription}</div>
        </div>
      </div>
    )

  }
}
export default Card
