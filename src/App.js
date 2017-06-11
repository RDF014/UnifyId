import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.key = '';
    this.counter = 0;
  }

  componentWillMount() {
    this.checkQuota();
    setInterval(() => {
      this.checkQuota();
    }, 5000)
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

  generateLongKey() {
    $.get('https://www.random.org/strings/?num=10&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new', (rawKey) => {
      this.key += rawKey;
      this.counter++;
      this.counter === 3 ? this.generateShortKey() : this.generateLongKey();
    })
  }

  generateShortKey() {
    $.get('https://www.random.org/strings/?num=1&len=17&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new', (rawKey) => {
      this.key += rawKey;
      this.counter = 1;
      this.refactorKey();
    })
  }

  refactorKey() {
    let key = this.key.split('\n').join('');
    for(let i = 0; i < key.length; i++) {
      if(i%76 === 0) {
        const leftHalf = key.slice(0, i);
        const rightHalf = key.slice(i, key.length);
        key = leftHalf + '\n' + rightHalf;
        i += 2;
      }
    }
    this.setState({key})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to UnifyId</h2>
        </div>
        <p> Current Quota: {this.state.quota}</p>
        <p>
          {this.state.numbers}
        </p>
        <button onClick={() => this.getNumber()}>
          generateNewNumber
        </button>
        <button onClick={() => this.generateLongKey()}>
          Generate RSA key
        </button>
        <p> {this.state.key} </p>
      </div>
    );
  }
}

export default App;
