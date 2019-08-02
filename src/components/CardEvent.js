import React from 'react'
import '../style.scss'
class CardEvent extends
  React.Component {
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
          <div className="card-header-title is-2">{this.props.name}</div>
        </div>
        <div className="card-image">
          <figure className="image is-3by2">
            <img src={this.props.EventImage} alt={this.props.EventName} />
          </figure>
        </div>
        <div className="card-content">
          <div className="subtitle is-6"><span className="has-text-weight-semibold">Date:</span> {this.props.eventDate}</div>
          <div className="content is-small">{this.props.eventDescription}</div>
        </div>
      </div>
    )
  }
}
export default CardEvent
