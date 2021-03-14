import React from 'react';
import Carousel from '../carousel';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



Enzyme.configure({ adapter: new Adapter() });

const CarouselwithProvider = ()=> {return(
  <Provider>
    <Carousel images={[]} />
  </Provider>
)}

it("carousel is rendered without crash",()=> {
  const div = document.createElement('div');
  ReactDOM.render(CarouselwithProvider,div)
});
