import React from "react"
import ReactDOM from "react-dom"
import {shallow} from "enzyme"
import {expect} from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import DirectorActorList from "../directorsAndActors_list"

import Right from "../../../assets/right.png"
import Left from "../../../assets/left.png"

Enzyme.configure({adapter: new Adapter()})

let Directors = [
  {"name":"Eshom Nelms","image":"https://images-3.wuaki.tv/system/photos/182097/original/eshom-nelms-1602661345.jpeg"},
  {"name":"Ian Nelms","image":"https://images-3.wuaki.tv/system/photos/182100/original/ian-nelms-1602661360.jpeg"}
]
let Actors = [
  {"name":"Mel Gibson","image":"https://images-2.wuaki.tv/system/photos/2268/original/mel-gibson-1525277465.jpeg"},
  {"name":"Walton Goggins","image":"https://images-2.wuaki.tv/system/photos/8410/original/walton-goggins-1525284625.jpeg"},
  {"name":"Marianne Jean-Baptiste","image":"https://images-2.wuaki.tv/system/photos/8233/original/marianne-jean-baptiste-1525284404.jpeg"},
  {"name":"Chance Hurstfield","image":"https://images-3.wuaki.tv/system/photos/182103/original/chance-hurstfield-1602661433.jpeg"},
  {"name":"Shaun Benson","image":"https://images-2.wuaki.tv/system/photos/3725/original/shaun-benson-1525279167.jpeg"},
  {"name":"Paulino Nunes","image":"https://images-2.wuaki.tv/system/photos/168816/original/paulino-nunes-1558406971.jpeg"}
]
let id= "DA_id"

const wrapper = shallow(<DirectorActorList directors={Directors} actors={Actors} id={id} />);


it("renders Directors and actors list without crash", () => {
  const div = document.createElement("div")
  ReactDOM.render(<DirectorActorList directors={[]} actors={[]} />, div)
})

it("renders an wrapper main_DA around Director actor cotainer", () => {
  expect(wrapper.find(".main_DA")).to.have.lengthOf(1)
})

it("renders an wrapper for each element in Director actor cotainer", () => {
  expect(wrapper.find(".card_DA")).to.have.lengthOf(1)
})

it("left arrow to navigate on director list is a img", () => {
  expect(wrapper.find(".left-arrow").type()).to.equal("img")
})

it("right arrow to navigate on director list is a img", () => {
  expect(wrapper.find(".right-arrow").type()).to.equal("img")
})

it("renders all 10 images-> 2 directors, 6 Actors and 2 arrow images in DirectorActorList for a given props", () => {
  expect(wrapper.find("img").length).equal(10)
});

it("renders correct right-arrow image",()=>{
  expect(wrapper.find(".right-arrow").prop("src")).equal(Right);
})

it("renders correct left-arrow image",()=>{
  expect(wrapper.find(".left-arrow").prop("src")).equal(Left);
})