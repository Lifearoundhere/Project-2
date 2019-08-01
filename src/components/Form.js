import React from 'react'


class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
      errors: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Keyword</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="keyword"
                  placeholder="eg: accountant"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.keyword && <small className="help is-danger">{this.state.errors.keyword}</small>}
            </div>
            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="location"
                  placeholder="eg: London"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.location && <small className="help is-danger">{this.state.errors.location}</small>}
            </div>
            <button className="button is-primary">Search</button>
          </form>
        </div>
      </section>
    )
  }
}
export default Form