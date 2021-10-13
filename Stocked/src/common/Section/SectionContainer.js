import React from "react"

import Section from "./Section"

class SectionContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { backgroundColor } = this.props

    return (
      <Section
        backgroundColor={backgroundColor}
      />
    )
  }
}

export default SectionContainer