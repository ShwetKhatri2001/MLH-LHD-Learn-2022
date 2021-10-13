import React from "react"
import PropTypes from "prop-types"

import SearchMainSection from "./SearchMainSection"
import DefaultMainSection from "./DefaultMainSection"

import "./MainSection.css"

const getSectionType = (type, logo, placeholderValue, onChangeHandle, onSearchSubmit) => {
  switch(type) {
    case 'search':
      return <SearchMainSection
          logo={logo}
          placeholderValue={placeholderValue}
          onChangeHandle={onChangeHandle}
          onSearchSubmit={onSearchSubmit}
        />
    default:
      return <DefaultMainSection />
  }
}

const MainSection = (props) => {
  const {
    theme,
    type,
    logo,
    placeholderValue,
    onChangeHandle,
    onSearchSubmit,
  } = props

  return (
    <section className={`${theme} main-section`}>
      {getSectionType(type, logo, placeholderValue, onChangeHandle, onSearchSubmit)}
    </section>
  )
}

MainSection.propTypes = {
  theme: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  placeholderValue: PropTypes.string.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
}

export default MainSection