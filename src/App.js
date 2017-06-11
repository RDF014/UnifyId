import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.checkQuota();
    this.getNumber();
  }

  getNumber() {
    $.get(`https://www.random.org/integers/?num=1&min=${Math.pow(-10, 9)}&max=${Math.pow(10, 9)}&col=2&base=10&format=plain&rnd=new`, (numbers) => {
      this.setState({numbers});
    })
  }

  checkQuota() {
    $.get('https://www.random.org/quota/?format=plain', (quota) => {
      this.setState({quota});
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p> {this.state.quota}</p>
        <p>
          {this.state.numbers}{typeof this.state.numbers}
        </p>
        <button onClick={() => this.getNumber()}>
          generateNewNumber
        </button>
      </div>
    );
  }
}

export default App;
