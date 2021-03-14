import React from "react"
import ReactDOM from "react-dom"
import {shallow} from "enzyme"
import { Provider } from 'react-redux'
import {expect} from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Home from '../Home'


Enzyme.configure({adapter: new Adapter()})

const homeWithProvider = ()=> {return(
  <Provider>
    <Home />
  </Provider>
)}

it("Home Screen is rendered without crash", () => {
  const div = document.createElement("div")
  ReactDOM.render(homeWithProvider, div)
})
