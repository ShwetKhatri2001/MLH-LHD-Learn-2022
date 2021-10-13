import React, { Component } from "react"
import { Route, Link } from "react-router-dom"

import Navbar from './Navbar'

class NavbarContainer extends Component {
  constructor(props) {
    super(props)
  }

  buildRoutesToShow(routes) {
    const routesToShow = routes
      .filter(route => route.navbar)
      .map(route => (
        <li key={route.name}>
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))

    return routesToShow
  }

  render() {
    const { routes } = this.props

    return (
      <Navbar
        routes={routes}
        buildRoutesToShow={this.buildRoutesToShow}
      />
    )
  }
}

const createRoutes = (routes) => {
  const routesArr = [
    <Route key={0} path="/" exact component={routes[0].component} />,
  ]

  for (let i=1; i<routes.length; i++) {
    routesArr.push(
      <Route key={i} path={routes[i].path} component={routes[i].component} />
    )
  }

  return routesArr
}

export { createRoutes }

export default NavbarContainer