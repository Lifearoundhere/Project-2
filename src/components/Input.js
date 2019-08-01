import React from 'react'
import Card from './Card'
import _ from 'lodash'

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
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
      </div>
    )
  }
}
export default Input 