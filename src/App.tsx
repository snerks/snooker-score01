import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <span className="ball red"></span>
        <span className="ball yellow"></span>
        <span className="ball green"></span>
        <span className="ball brown"></span>
        <span className="ball blue"></span>
        <span className="ball pink"></span>
        <span className="ball black"></span>
      </header>
    </div>
  );
}

export default App;
