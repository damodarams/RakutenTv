import NavBar from "../navBar"
import React from "react"
import ReactDOM from "react-dom"
import {shallow} from "enzyme"
import {expect} from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import RakutenLogo from "../../../assets/rakutenTv.png"

Enzyme.configure({adapter: new Adapter()})

it("renders correct header image", () => {
  const wrapper = shallow(<NavBar />)
  expect(wrapper.find(".logo-img").prop("src")).equal(RakutenLogo)
})

it('renders an container div', () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper.find('.container')).to.have.lengthOf(1);
});