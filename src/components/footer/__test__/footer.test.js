import Footer from '../footer'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Device_icon from '../../../assets/devices.png'
import Payment_icon from '../../../assets/payments.png'
import Info_icon from '../../../assets/info.png'
import RakutenLogo from '../../../assets/rakutenTv.png'

 
Enzyme.configure({ adapter: new Adapter() });

it("renders Footer without crash",() => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer/>,div)
})

it('renders an .footer_info_title', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find('.footer_info_title')).to.have.lengthOf(1);
});

it("renders a text as expected", () => {
  const wrapper = shallow(<div><b>important</b></div>);
  expect(wrapper.text()).to.equal('important');
});


it("footer_mini_company_logo is a img",()=> {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find('.footer_mini_company_logo').type()).to.equal('img');
})

it("renders all 4 images in footer", () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find("img").length).equal(4)
 
});

it("renders correct DeviceIcon image",()=>{
  const wrapper = shallow(<Footer />);
  expect(wrapper.find(".device-img").prop("src")).equal(Device_icon);
})

it("renders correct Payment_icon image",()=>{
  const wrapper = shallow(<Footer />);
  expect(wrapper.find(".payment-img").prop("src")).equal(Payment_icon);
})

it("renders correct info image",()=>{
  const wrapper = shallow(<Footer />);
  expect(wrapper.find(".info-img").prop("src")).equal(Info_icon);
})

it("renders correct Rakuten footer logo image",()=>{
  const wrapper = shallow(<Footer />);
  expect(wrapper.find(".footer_mini_company_logo").prop("src")).equal(RakutenLogo);
})