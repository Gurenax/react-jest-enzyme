import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import App from '../App';

/*
*   Default test that comes with create-react-app
*/
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {

  /*
  * Test by matching a snapshot
  */
  it('renders correctly', () => {
    const output = shallow(
      <App />
    )
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  /*
  * Test by rendering through mounting
  */
  it('always renders a div', () => {
    const output = mount(
      <App />
    )
    const divs = output.find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  /*
  *   Test when state changes with standard event
  */
  it('changes the state when button is clicked', () => {
    const output = shallow(<App />)
    // Before click
    expect(output.state().clicked).toEqual(false)
    // During click
    output.find('button').simulate('click') // Standard onClick
    // After click
    expect(output.state().clicked).toEqual(true)
  })

  /*
  *   Test when state changes with custom event 'onLinkClick'
  */
  it('changes the state when Link is clicked', () => {
    const output = shallow(<App />)
    // Before click
    expect(output.state().clicked).toEqual(false)
    // During click
    output.find('Link').simulate('linkClick') // Because event is called onLinkClick
    // After click
    expect(output.state().clicked).toEqual(true)
  })
})