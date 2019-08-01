import React from 'react'


class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { keyword, location } = this.state.formData
    this.props.history.push(`/results/${keyword}/${location}`)
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
            </div>
            <button className="button is-primary">Search</button>
          </form>
        </div>
      </section>
    )
  }
}
export default Form
