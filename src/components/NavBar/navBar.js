import React from "react"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import RakutenLogo from "../../assets/rakutenTv.png"

import "./navBar.css"

const Navbar = () => {
  return (
    <div className="container">
      <div className="logo">
        <Route>
          <Link to="/">
            <img src={RakutenLogo} className="logo-img" width="187" height="42" alt="rakuten logo" />
          </Link>
        </Route>
      </div>
      <div className="navbar"></div>
    </div>
  )
}
export default Navbar
