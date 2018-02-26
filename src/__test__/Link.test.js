import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import sinon from 'sinon'

import Link from '../components/Link'

describe('Link', () => {
  /*
  *   Test by counting number of elements
  */
  it('renders a link', () => {
    const output = shallow(<Link />)
    expect(output.find('a').length).toEqual(1)
  })

  it('renders an output area', () => {
    const output = shallow(<Link />)
    expect(output.find('div.output-area').length).toEqual(1)
  })

  it('renders a heading inside the output area', () => {
    const output = shallow(<Link />)
    expect(output.find('div.output-area').find('h2').length).toEqual(1)
  })

  it('renders the link inside the output area', () => {
    const output = shallow(<Link />)
    expect(output.find('div.output-area').find('a').length).toEqual(1)
  })

  /*
  *   Test by expecting exact html
  */
  it('renders the Link output area', () => {
    const output = shallow(<Link title='Google' url='http://www.google.com'/>)
    const expected =
      '<div class="output-area">' +
      '<h2>A link to Google</h2>' +
      '<a href="http://www.google.com">'+
      'Google' +
      '</a>' +
      '</div>'
    const result = output.find('div.output-area').html()
    expect(result.indexOf(expected) > -1).toEqual(true)
  })

  /*
  * Test by matching a snapshot
  */
  it('renders correctly', () => {
    const output = shallow(
      <Link title="mockTitle" url="mockUrl" />
    )
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  /*
  * Test window events
  */
  it('handles the click event and calls a window.alert', () => {
    window.alert = jest.fn()
    const output = shallow(
      <Link title="mockTitle" url="mockUrl" />
    )
    
    output.find('a').simulate('click')
    expect(window.alert).toHaveBeenCalledWith('Clicked!')
  })

  /*
  * Test events when it's a custom function
  */
  it('calls a function when clicked', () => {
    const doSomethingCool = jest.fn() // Mock function doSomethingCool()
    const output = shallow(
      <Link title="mockTitle" url="mockUrl" onLinkClick={() => {
        doSomethingCool()
      }} />
    )
    output.simulate('click')
    expect(doSomethingCool).toHaveBeenCalledTimes(1)
  })

  /*
  * Test simulated click events
  */
  it('simulates click events', () => {
    const onLinkClick = sinon.spy()
    const output = shallow(
      <Link title="mockTitle" url="mockUrl" onLinkClick={onLinkClick} />
    )
    output.simulate('click')
    expect(onLinkClick.calledOnce).toEqual(true)
  })
})