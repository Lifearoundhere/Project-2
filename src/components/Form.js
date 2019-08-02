import React from 'react'


class Form extends React.Component {
  constructor(props) {
    super(props)
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
              <label className="label is-size-3">Keyword</label>
              <div className="control">
                <input
                  className="input is-medium"
                  type="text"
                  name="keyword"
                  placeholder="eg: accountant"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label is-size-3">Location</label>
              <div className="control">
                <input
                  className="input is-medium"
                  type="text"
                  name="location"
                  placeholder="eg: London"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="is-centered">
              <button className="button is-link is-large">Search</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}
export default Form
