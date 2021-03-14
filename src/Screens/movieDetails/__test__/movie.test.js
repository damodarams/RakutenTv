import React from "react"
import ReactDOM from "react-dom"
import {shallow} from "enzyme"
import { Provider } from 'react-redux'
import {expect} from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Movie from '../movie'


Enzyme.configure({adapter: new Adapter()})

const movieWithProvider = ()=> {return (
  <Provider>
    <Movie />
  </Provider>
)}

it("Home Screen is rendered without crash", () => {
  const div = document.createElement("div")
  ReactDOM.render(movieWithProvider, div)
})