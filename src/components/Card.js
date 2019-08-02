import React from 'react'
import '../style.scss'
class Card extends
  React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.convertDate = this.convertDate.bind(this)
  }
  convertDate() {
    return new Date(this.props.date).toDateString()
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <p className="card-header-title title is-4 has-text-left-tablet">{this.props.jobTitle}</p>
          <p className="card-header-title is-small">{this.props.employerName}</p>
        </div>
        <div className="card-content">
          <p className="subtitle is-6"> <span className="has-text-weight-semibold">Location:</span> {this.props.locationName}</p>
          <p className="subtitle is-6"><span className="has-text-weight-semibold">Salary:</span> {this.props.minimumSalary} {this.props.currency} - {this.props.maximumSalary} {this.props.currency}</p>
          <p className="subtitle is-6"><span className="has-text-weight-semibold">Date:</span> {this.props.date}</p>
          <p className="content is-small">{this.props.jobDescription}</p>
        </div>
      </div>
    )
  }
}
export default Card
