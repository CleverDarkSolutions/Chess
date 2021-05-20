import React from 'react';
import logo from './logo.svg';
import './App.css';
import { addField } from './CounterSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImplementBoard from './components/ImplementBoard';


function App() {
    const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="board">
      <ImplementBoard></ImplementBoard>
      </div>
    </div>
  );
}

export default App;
