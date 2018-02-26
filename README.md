# React Unit Tests with Jest, Enzyme and Sinon

## Install Enzyme
- a testing utility for React
`yarn add --dev enzyme enzyme-adapter-react-16`

## Install Enzyme to JSON
- converts Enzyme wrappers for Jest snapshot matcher
`yarn add --dev enzyme-to-json`

## Install Sinon
- Standalone test spies, stubs and mocks for JavaScript. 
`yarn add --dev sinon`

## Setup file `src\setupTests.js`
```javascript
// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

## `Link.test.js`

### Test by counting number of elements
```javascript
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
```

### Test by expecting exact html
```javascript
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
```

### Test by matching a snapshot
```javascript
it('renders correctly', () => {
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})
```

### Test window events
```javascript
it('handles the click event and calls a window.alert', () => {
  window.alert = jest.fn()
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" />
  )
  
  output.find('a').simulate('click')
  expect(window.alert).toHaveBeenCalledWith('Clicked!')
})
```

### Test events when it's a custom function
```javascript
it('calls a function when clicked', () => {
  const doSomethingCool = jest.fn() // Mock function doSomethingCool()
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" onLinkClick={() => {
      doSomethingCool()
    }} />
  )
  output.find('div').simulate('click')
  expect(doSomethingCool).toHaveBeenCalledTimes(1)
})
```

### Test simulated click events
```javascript
it('simulates click events', () => {
  const onLinkClick = sinon.spy()
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" onLinkClick={onLinkClick} />
  )
  output.simulate('click')
  expect(onLinkClick.calledOnce).toEqual(true)
})
```

## `App.test.js`

### Test by matching a snapshot
```javascript
it('renders correctly', () => {
  const output = shallow(
    <App />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})
```

### Test when state changes with standard event
```javascript
it('changes the state when button is clicked', () => {
  const output = shallow(<App />)
  // Before click
  expect(output.state().clicked).toEqual(false)
  // During click
  output.find('button').simulate('click') // Standard onClick
  // After click
  expect(output.state().clicked).toEqual(true)
})
```

### Test when state changes with custom event 'onLinkClick'
```javascript
it('changes the state when Link is clicked', () => {
  const output = shallow(<App />)
  // Before click
  expect(output.state().clicked).toEqual(false)
  // During click
  output.find('Link').simulate('linkClick') // Because event is called onLinkClick
  // After click
  expect(output.state().clicked).toEqual(true)
})
```

## Disable jsdom in package.json if not needed
- If not using jsdom (e.g. document, window), tests will run faster when it's disabled
```javascript
// "test": "react-scripts test --env=jsdom",
"test": "react-scripts test",
```
