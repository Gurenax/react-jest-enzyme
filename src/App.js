import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'

/* Components */
import Link from './components/Link'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Jest Enzyme</h1>
        <Link title="Hello World" url="http://www.google.com" />
      </div>
    )
  }
}

export default App
