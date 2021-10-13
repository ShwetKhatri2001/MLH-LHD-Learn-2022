import React from "react"
import TextField from "@material-ui/core/TextField"
import propTypes from "prop-types"

import "./MainSection.css"

const SearchMainSection = (props) => {
  const {
    logo,
    placeholderValue,
    onChangeHandle,
    onSearchSubmit,
  } = props

  return (
    <div>
      <div className="logo-container">
        <img src={logo} />
      </div>
      <div className="search-field-container">
        <form onSubmit={onSearchSubmit}>
          <TextField
            id="outlined-error"
            label="Search"
            value={placeholderValue}
            onChange={onChangeHandle}
            className="search-field"
            name="symbol"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    </div>
  )
}

SearchMainSection.propTypes = {
  logo: propTypes.string.isRequired,
  placeholderValue: propTypes.string.isRequired,
  onChangeHandle: propTypes.func.isRequired,
  onSearchSubmit: propTypes.func.isRequired,
}

export default SearchMainSection