import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'

/* Components */
import Link from './components/Link'

class App extends Component {
  // constructor(props) {
  //   super(props)

  //   this.
  // }
  state = {
    clicked: false
  }

  onLinkClick = () => {
    this.setState({
      clicked: true
    })
  }
  
  render() {
    return (
      <div className="App">
        <h1>React Jest Enzyme</h1>
        <Link title="Google" url="http://www.google.com" onLinkClick={this.onLinkClick} />
        <button onClick={this.onLinkClick}></button>
      </div>
    )
  }
}

export default App
