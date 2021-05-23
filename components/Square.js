import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addMoves, clearMoves} from '../CounterSlice';

const Square = (props) => {
    //--------------CSS mostly---------------
    let dispatch = useDispatch();
    let divStyle;
    let notEmpty;

    if (props.colour && props.pawn)
        notEmpty = true;

    let imgStyle = {
        width: '5em',
        height: '5em',
        paddingTop: '1.5em'
    }

    if (props.background == "white") {
        divStyle = {
            width: '7em',
            height: '7em',
            background: '#FFEBCD',
            float: 'left'
        }
    }
    if (props.background == "black") {
        divStyle = {
            width: '7em',
            height: '7em',
            background: '#D2691E',
            float: 'left'
        }
    }
    //-----------moves-----------------------
    const fetchData = useSelector(state => state.counter.values); // find a match between square component and redux
    const fetchGlobalMoves = useSelector(state => state.counter.globalMoves); // for king's sake
    let squareData; // current square data
    let moves = []; // initial moves
    let possibleMoves = []; // after filtering
    let whoseMove = 'white';


    const findSquare = (posX, posY) => { // locates the square's id of given coordinates
        for (let i = 0; i < 64; i++) {
            if (fetchData[i].posX == posX && fetchData[i].posY == posY)
                return fetchData[i].id;
        }
        return 'error';
    }

    const clearTrash = () => {
        for (let p = 0; p < 5; p++) { // this is weird
            for (let i = 0; i < moves.length; i++) {
                if (moves[i] === 'error') {
                    moves.splice(i, 1);
                }
            }
        }
        return moves;
    }

    useEffect(() => {
        for (let i = 0; i < 64; i++) {
            if (fetchData[i].id == props.id)
                squareData = fetchData[i];
        }
    })

    const refreshTotalMoves = () => {
        dispatch(clearMoves());
        for(let i=0;i<63;i++){
            console.log("Popoga");
            finalMoves(fetchData[i].pawn);
        }
    }

    const pawnMoves = () => {
        // I've been thinking about implementing -1 and 1 constants for white and black pieces but 
        //since most pieces move omnidirectionally it doesn't make sense to make such effort

        if (squareData.posY == 2 || squareData.posY == 7) { // first move exception
            if (squareData.colour == 'white') {
                moves.push(findSquare(squareData.posX, squareData.posY + 2));

            }
            else if (squareData.colour == 'black') {
                moves.push(findSquare(squareData.posX, squareData.posY - 2));
            }
        }

        if (squareData.colour == 'white') {
            moves.push(findSquare(squareData.posX, squareData.posY + 1));
            moves.push(findSquare(squareData.posX - 1, squareData.posY + 1));
            moves.push(findSquare(squareData.posX + 1, squareData.posY + 1));
        }
        else if (squareData.colour == 'black') {
            moves.push(findSquare(squareData.posX, squareData.posY - 1));
            moves.push(findSquare(squareData.posX - 1, squareData.posY - 1));
            moves.push(findSquare(squareData.posX + 1, squareData.posY - 1));
        }
        return moves;
    }

    const knightMoves = () => {
        moves.push(findSquare(squareData.posX - 2, squareData.posY + 1));
        moves.push(findSquare(squareData.posX - 2, squareData.posY - 1));

        moves.push(findSquare(squareData.posX + 2, squareData.posY + 1));
        moves.push(findSquare(squareData.posX + 2, squareData.posY - 1));

        moves.push(findSquare(squareData.posX - 1, squareData.posY - 2));
        moves.push(findSquare(squareData.posX + 1, squareData.posY - 2));

        moves.push(findSquare(squareData.posX - 1, squareData.posY + 2));
        moves.push(findSquare(squareData.posX + 1, squareData.posY + 2));

        return moves;
    }

    const rookMoves = () => {
        for (let i = 1; i <= 8; i++) {
            moves.push(findSquare(squareData.posX, i));
            moves.push(findSquare(i, squareData.posY));
        }
        return moves;
    }

    const bishopMoves = () => {
        for (let i = 1; i <= 8; i++) {
            moves.push(findSquare(squareData.posX + i, squareData.posY + i));
            moves.push(findSquare(squareData.posX + i, squareData.posY - i));
            moves.push(findSquare(squareData.posX - i, squareData.posY + i));
            moves.push(findSquare(squareData.posX - i, squareData.posY - i));
        }
        return moves;
    }

    const queenMoves = () => {
        rookMoves();
        bishopMoves();
        return moves;
    }

    const kingMoves = () => {
        moves.push(findSquare(squareData.posX + 1, squareData.posY + 1));
        moves.push(findSquare(squareData.posX + 1, squareData.posY - 1));
        moves.push(findSquare(squareData.posX - 1, squareData.posY - 1));
        moves.push(findSquare(squareData.posX - 1, squareData.posY + 1));
        moves.push(findSquare(squareData.posX, squareData.posY + 1));
        moves.push(findSquare(squareData.posX, squareData.posY - 1));
        moves.push(findSquare(squareData.posX + 1, squareData.posY));
        moves.push(findSquare(squareData.posX - 1, squareData.posY));
    }

    //---------------------Filter moves------------------------//
    const filterMoves = (pawn) => {
        switch (pawn) {
            case "pawn":
                for (let i = 0; i < moves.length; i++) {

                    let id = moves[i];
                    console.log(id);
                    if (fetchData[id].posX != squareData.posX && fetchData[id].pawn != "" && fetchData[id].colour != squareData.colour) { // takes
                        console.log("First if");
                        possibleMoves.push(id);
                    }

                    if (fetchData[id].posX == squareData.posX && fetchData[id].pawn == "") { // moves forward
                        console.log("Second if");
                        possibleMoves.push(id);
                    }

                }
                break;

            case "bishop":
                for (let i = 0; i < moves.length; i++) {
                    let blockingPawns = []; // 0 = x, 1 = y

                    let id = moves[i];
                    if (fetchData[id].pawn != " ") { // find blocking pawns
                        blockingPawns.push([fetchData[id].posX, fetchData[id].posY]);
                    }

                    else {
                        for (let j = 0; j < blockingPawns.length; j++) {
                            if (fetchData[id].posX - blockingPawns[j][0] == fetchData[id].posY - blockingPawns[j][1]) // noice
                                continue;
                            else if (fetchData[id].colour != squareData.colour)
                                possibleMoves.push(id);

                        }
                    }

                }
                break;

            case "rook":
                for (let i = 0; i < moves.length; i++) {
                    let blockingPawns = []; // 0 = x, 1 = y

                    let id = moves[i];
                    if (fetchData[id].pawn != " ") { // find blocking pawns
                        blockingPawns.push([fetchData[id].posX, fetchData[id].posY]);
                    }

                    else {
                        for (let j = 0; j < blockingPawns.length; j++) {
                            if (fetchData[id].posX - blockingPawns[j][0] > 0 && fetchData[id].posY == blockingPawns[j][1])
                                continue; // vertical blocking
                            else if (fetchData[id].posY - blockingPawns[j][1] > 0 && fetchData[id].posX == blockingPawns[j][0])
                                continue; // horizontal blocking
                            else if (fetchData[id].colour != squareData.colour)
                                possibleMoves.push(id);

                        }
                    }

                }
            case "queen":
                for (let i = 0; i < moves.length; i++) {
                    let blockingPawns = []; // 0 = x, 1 = y

                    let id = moves[i];
                    if (fetchData[id].pawn != " ") { // find blocking pawns
                        blockingPawns.push([fetchData[id].posX, fetchData[id].posY]);
                    }

                    else {
                        for (let j = 0; j < blockingPawns.length; j++) {
                            if (fetchData[id].posX - blockingPawns[j][0] > 0 && fetchData[id].posY == blockingPawns[j][1])
                                continue;
                            else if (fetchData[id].posY - blockingPawns[j][1] > 0 && fetchData[id].posX == blockingPawns[j][0])
                                continue;
                            else if (fetchData[id].posX - blockingPawns[j][0] == fetchData[id].posY - blockingPawns[j][1])
                                continue;
                            else if (fetchData[id].colour != squareData.colour)
                                possibleMoves.push(id);

                        }
                    }

                }
            case "king":
                for (let i = 0; i < moves.length; i++) {
                    let id = moves[i];
                    for(let j=0;j<fetchGlobalMoves.length;j++){
                        if(id == fetchGlobalMoves[j]) // preventing walking on checks by king
                            continue;
                        else if (fetchData[id].colour != squareData.colour)
                            possibleMoves.push(id);
                    }
                }
            

        }
        return possibleMoves;
    }
    const finalMoves = (pawn) => {
        switch (pawn) {
            case 'pawn':
                pawnMoves();
                clearTrash();
                filterMoves('pawn');
                dispatch(addMoves(possibleMoves) );
                break;
            case 'rook':
                rookMoves();
                clearTrash();
                filterMoves('rook');
                dispatch(addMoves(possibleMoves));
                break;
            case 'bishop':
                bishopMoves();
                clearTrash();
                filterMoves('bishop');
                dispatch(addMoves(possibleMoves));
                break;
            case 'queen':
                queenMoves();
                clearTrash();
                filterMoves('queen');
                dispatch(addMoves(possibleMoves));
                break;
            case 'king':
                kingMoves()
                clearTrash();
                filterMoves('king');
                dispatch(addMoves(possibleMoves));
                break;
            case 'knight':
                knightMoves();
                clearTrash();
                dispatch(addMoves(possibleMoves));
                break;
    }
}
    const click = () => {
        //refreshTotalMoves();
        console.log(moves);
        console.log(squareData);
        switch (props.pawn) {
            case 'pawn':
                finalMoves('pawn');
                break;
            case 'rook':
                finalMoves('pawn');
                break;
            case 'bishop':
                finalMoves('bishop');
                break;
            case 'queen':
                finalMoves('queen');
                break;
            case 'king':
                finalMoves('king');
                break;
            case 'knight':
                finalMoves('knight');
                break;
        }
        console.log("Koncowe ruchy: " + possibleMoves);
    }
    //console.log(fetchData);

    return (
        <div style={divStyle} onClick={() => { click() }}>
            {props.id}
            { notEmpty && <img style={imgStyle} src={`../../img/${props.colour + props.pawn}.png`}></img>}
        </div>
    )
}

export default Square;