import React from "react"
import ReactDOM from "react-dom"
import {shallow} from "enzyme"
import {expect} from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import ErrorScreen from "../error"

import WarningImg from "../../../assets/Something-Wrong.png"

Enzyme.configure({adapter: new Adapter()})

jest.mock('../../../manager/analyticsManager.js');
const mixpanel = require('../../../manager/analyticsManager.js')
mixpanel.trackEvent(() => {return(undefined)});

it("Error Screen is rendered without crash", () => {
  const div = document.createElement("div")
  ReactDOM.render(<ErrorScreen />, div)
})

it("renders images in Error screen", () => {
  const wrapper = shallow(<ErrorScreen />)
  expect(wrapper.find("img").length).equal(1)
})

it("Warning symbol is a img", () => {
  const wrapper = shallow(<ErrorScreen />)
  expect(wrapper.find(".warning-img").type()).to.equal("img")
})

it("renders correct warning-img image", () => {
  const wrapper = shallow(<ErrorScreen />)
  expect(wrapper.find(".warning-img").prop("src")).equal(WarningImg)
})

it("renders a error text as expected", () => {
  const wrapper = shallow(<ErrorScreen />)
  expect(wrapper.find(".heading").text()).to.equal("Something went wrong")
})
