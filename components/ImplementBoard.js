import Board from './Board';
import Square from './Square';
import { useDispatch, useSelector } from 'react-redux';
import { addField, returnState } from '../CounterSlice';

const ImplementBoard = () => {
    console.log(useSelector(state => state.counter.values));
    const dispatch = useDispatch();
    for(let i=0;i<64;i++){
        console.log('log');
        if(i==0)
            dispatch( () => { addField( { id: i, background: "white", pawn: "rook", colour: "black", posX : 1, posY : 8 } ) });
        else if(i==1)
            dispatch(() => { addField({ id: i, background: "black", pawn: "knight", colour: "black", posX: 2, posY: 8 }) });
        else if(i==2)
            dispatch(() => { addField({ id: i, background: "white", pawn: "bishop", colour: "black", posX: 3, posY: 8 }) });
        else if(i==3)
            dispatch(() => { addField({ id: i, background: "black", pawn: "queen", colour: "black", posX: 4, posY: 8 }) });
        else if(i==4)
            dispatch(() => { addField({ id: i, background: "white", pawn: "king", colour: "black", posX: 5, posY: 8 }) });
        else if(i==5)
            dispatch(() => { addField({ id: i, background: "black", pawn: "bishop", colour: "black", posX: 6, posY: 8 }) });
        else if(i==6)
            dispatch(() => { addField({ id: i, background: "white", pawn: "knight", colour: "black", posX: 7, posY: 8 }) });
        else if(i==7)
            dispatch(() => { addField({ id: i, background: "black", pawn: "rook", colour: "black", posX: 8, posY: 8 }) });
        else if(i==8)
            dispatch(() => { addField({ id: i, background: "black", pawn: "pawn", colour: "black", posX: 1, posY: 7 }) });
        else if(i==9)
            dispatch(() => { addField({ id: i, background: "white", pawn: "pawn", colour: "black", posX: 2, posY: 7 }) });
        else if(i==10)
            dispatch(() => { addField({ id: i, background: "black", pawn: "pawn", colour: "black", posX: 3, posY: 7 }) });
        else if(i==11)
            dispatch(() => { addField({ id: i, background: "white", pawn: "pawn", colour: "black", posX: 4, posY: 7 }) });
        else if(i==12)
            dispatch(() => { addField({ id: i, background: "black", pawn: "pawn", colour: "black", posX: 5, posY: 7 }) });
        else if(i==13)
            dispatch(() => { addField({ id: i, background: "white", pawn: "pawn", colour: "black", posX: 6, posY: 7 }) });
        else if(i==14)
            dispatch(() => { addField({ id: i, background: "white", pawn: "pawn", colour: "black", posX: 7, posY: 7 }) });
        else if(i==15)
            dispatch(() => { addField({ id: i, background: "white", pawn: "pawn", colour: "black", posX: 4, posY: 7 }) });







    }
    return (
        <Board arrayPawns={useSelector( state => state.counter.values)}></Board>
        //<button onClick={}></button>
    )
}

export default ImplementBoard;