import Menu from '../menu'
import React from "react"
import ReactDOM from "react-dom"
import {shallow} from "enzyme"
import {expect} from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"


Enzyme.configure({adapter: new Adapter()})

const menuWithProvider = ()=> {return(
  <Provider>
    <Menu />
  </Provider>
)}

// it("renders correct header image", () => {
//   const wrapper = shallow(<NavBar />)
//   expect(wrapper.find(".logo-img").prop("src")).equal(RakutenLogo)
// })

it("renders Menu without crash", () => {
  const div = document.createElement("div")
  ReactDOM.render(menuWithProvider, div)
})
