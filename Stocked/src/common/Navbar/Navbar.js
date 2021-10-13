import React from "react"
import propTypes from "prop-types"

import "./Navbar.css"

const Navbar = (props) => {
  const { buildRoutesToShow, routes } = props

  return (
    <nav>
      <ul>
        {buildRoutesToShow(routes)}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  buildRoutesToShow: propTypes.func.isRequired,
  routes: propTypes.any.isRequired,
}

export default Navbar