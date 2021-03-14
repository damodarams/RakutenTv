import React from "react"
import LandingPage from "./components/route/menu"
import {initMixpanel} from "./manager/analyticsManager"
import "./App.css"

const App = () => {
  initMixpanel()
  return <LandingPage />
}

export default App
