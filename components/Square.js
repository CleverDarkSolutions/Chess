import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const fetchData = useSelector(state => state.counter.values) // find a match between square component and redux
    let squareData;
    let moves = []; // initial moves
    let possibleMoves = []; // after filtering
    let whoseMove = 'white';


    const findSquare = (posX, posY) => { // locates the square's id of given coordinates
        for (let i = 0; i < 64; i++) {
            if (fetchData[i].posX == posX && fetchData[i].posY == posY)
                return fetchData[i].id;
        }
        return 'nan';
    }

    useEffect(() => {
        for (let i = 0; i < 64; i++) {
            if (fetchData[i].id == props.id)
                squareData = fetchData[i];
        }
    })

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

    const rookMoves = () => {
        for(let i=1;i<=8;i++){
            moves.push(findSquare(squareData.posX,i));
            moves.push(findSquare(i,squareData.posY));
        }
        return moves;
    }

    const bishopMoves = () => {
        for(let i=1;i<=8;i++){
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
        moves.push(findSquare(squareData.posX +1, squareData.posY + 1));
        moves.push(findSquare(squareData.posX +1, squareData.posY - 1));
        moves.push(findSquare(squareData.posX -1, squareData.posY - 1));
        moves.push(findSquare(squareData.posX -1, squareData.posY + 1));
        moves.push(findSquare(squareData.posX , squareData.posY + 1));
        moves.push(findSquare(squareData.posX , squareData.posY - 1));
        moves.push(findSquare(squareData.posX + 1 , squareData.posY));
        moves.push(findSquare(squareData.posX - 1 , squareData.posY));
    }

    const click = () => {
        console.log(props.id);
        console.log(squareData);
        switch(props.pawn){
            case 'pawn':
                pawnMoves();
                break;
            case 'rook':
                rookMoves();
                break;
            case 'bishop':
                bishopMoves();
                break;
            case 'queen':
                queenMoves();
                break;
            case 'king':
                kingMoves();
                break;
        }
        console.log(moves);
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