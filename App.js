import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  for (let i = 1; i <= 64; i++) {
    if (i % 1 == 0 || i % 3 == 0 || i % 5 == 0 || i % 7 == 0 || i % 10 == 0 || i % 12 == 0 || i % 14 == 0 || i % 16 == 0) {

    }
  }

  return (
    <div className="App">
      Popoga
    </div>
  );
}

export default App;
