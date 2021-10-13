import React, { Component } from "react"
import { withRouter, Redirect } from "react-router"

import MainSection from "./MainSection"

class MainSectionCaontainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      placeholderValue: "",
      goTo: "",
    }

    this.onSearchChangeHandle = this.onSearchChangeHandle.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  onSearchChangeHandle(event) {
    const { value } = event.target

    this.setState({
      placeholderValue: value,
    })
  }

  onSearchSubmit(event) {
    event.preventDefault()

    this.setState({
      goTo: "stocks",
    })
  }

  render() {
    const { theme, type, logo } = this.props
    const { placeholderValue, goTo } = this.state

    if (goTo === "stocks") {
      const url = `/stocks/${placeholderValue}`

      return <Redirect to={url} />
    }

    return (
      <MainSection
        theme={theme}
        type={type}
        logo={logo}
        placeholderValue={placeholderValue}
        onChangeHandle={this.onSearchChangeHandle}
        onSearchSubmit={this.onSearchSubmit}
      />
    )
  }
}

export default MainSectionCaontainer