import React from "react"
import propTypes from "prop-types"

import "./Section.css"

const Section = (props) => {
  const { backgroundColor } = props

  return (
    <section className={`secondary-section background-${backgroundColor}`}>

    </section>
  )
}

Section.propTypes = {
  backgroundColor: propTypes.string.isRequired,
}

export default Section