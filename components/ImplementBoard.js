import Board from './Board';
import Square from './Square';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import { addField, returnState } from '../CounterSlice';

const ImplementBoard = () => {
    return (
        <Board arrayPawns={useSelector( state => state.counter.values)}></Board>
        //<button onClick={}></button>
    )
}

export default ImplementBoard;