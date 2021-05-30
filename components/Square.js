import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHover, deleteHover, addMoves, clearMoves, unsetPawn, setPawn, setLast, addLastMoves, addBlockedMoves, setTurnBlack, setTurnWhite, setMoves } from '../CounterSlice';

const Square = (props) => {
    const fetchData = useSelector(state => state.counter.values); // find a match between square component and redux
    const fetchGlobalMoves = useSelector(state => state.counter.globalMoves); // for king's sake
    const fetchLast = useSelector(state => state.counter.last);
    const fetchBlockedMoves = useSelector(state => state.counter.blockedMoves);
    const fetchTurn = useSelector(state => state.counter.whoseTurn);
    const id = props.id;
    //--------------CSS mostly---------------
    let dispatch = useDispatch();
    let divStyle;

    let imgStyle = {
        width: '5em',
        height: '5em',
        paddingTop: '1.5em'
    }

    let hoverStyle = {
        opacity: '0.3',
        height: '4em',
        width: '4em',
        position: 'relative',
        top: '1.5em',
        right: '0.5em'
    }

    if (props.background == "white") {
        if (fetchData[id].hover) {
            divStyle = {
                width: '7em',
                height: '7em',
                background: '#ffdf8f',
                float: 'left',
            }
        }
        else {
            divStyle = {
                width: '7em',
                height: '7em',
                background: '#FFEBCD',
                float: 'left'
            }
        }
    }

    if (props.background == "black") {
        if (fetchData[id].hover) {
            divStyle = {
                width: '7em',
                height: '7em',
                background: '#ffdf8f',
                float: 'left'
            }
        }
        else {
            divStyle = {
                width: '7em',
                height: '7em',
                background: '#D2691E',
                float: 'left',
            }
        }
    }
    //-----------moves-----------------------
    let notEmpty;
    if (fetchData[props.id].pawn != "")
        notEmpty = true;
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

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
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
        let arr = [];
        for(let i = 0; i < 64; i++) {
            squareData = fetchData[i]; 
            arr.concat(finalMoves(squareData.pawn));
        }
        arr = arr.filter(onlyUnique);
        dispatch(setMoves(arr));
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
        let blockedMoves = []; // 0 = x, 1 = y
        switch (pawn) {
            case "pawn":
                let ifBlocked = false;
                for (let i = 0; i < moves.length; i++) {

                    let id = moves[i];

                    //-----Not allowing pawn to jump over pieces
                    if( (fetchData[id].posY == 4 || fetchData[id].posY == 5) && fetchData[id].posX == squareData.posX ){
                        if(squareData.colour == "white"){
                            let square = findSquare(fetchData[id].posX, fetchData[id].posY - 1);
                            if(fetchData[square].pawn != ""){
                                ifBlocked = true;
                            }
                        }

                        else if(squareData.colour == "black"){
                            let square = findSquare(fetchData[id].posX, fetchData[id].posY + 1);
                            if (fetchData[square].pawn != ""){
                                ifBlocked = true;
                            }
                        }
                    }
                    console.log(ifBlocked);
                    if (fetchData[id].posX == squareData.posX && fetchData[id].pawn == "" && ifBlocked == false) { // moves forward
                        // console.log("Second if");
                        possibleMoves.push(id);
                    }
                
                    else if (fetchData[id].posX != squareData.posX && fetchData[id].pawn != "" && fetchData[id].colour != squareData.colour) { // takes
                        //console.log("First if");
                        possibleMoves.push(id);
                    }


                }
                break;

            case "bishop":
                for (let i = 0; i < moves.length; i++) {

                    let id = moves[i];
                    if (fetchData[id].pawn != "") { // find blocking pawns
                        blockedMoves.push([fetchData[id].posX, fetchData[id].posY, id]);
                    }

                    else {
                        for (let j = 0; j < blockedMoves.length; j++) {
                            if (fetchData[id].posX - blockedMoves[j][0] == fetchData[id].posY - blockedMoves[j][1]) {
                                //console.log("Bishop first if");
                                continue;
                            }
                            else if (fetchData[id].colour != squareData.colour)
                                possibleMoves.push(id);

                        }
                    }

                }
                break;

            case "rook":
                for (let i = 0; i < moves.length; i++) {

                    let id = moves[i];
                    if (fetchData[id].pawn != "") { // find blocking pawns
                        blockedMoves.push([fetchData[id].posX, fetchData[id].posY, id]);
                    }

                    else {
                        for (let j = 0; j < blockedMoves.length; j++) {
                            if (fetchData[id].posX - blockedMoves[j][0] > 0 && fetchData[id].posY == blockedMoves[j][1])
                                continue; // vertical blocking
                            else if (fetchData[id].posY - blockedMoves[j][1] > 0 && fetchData[id].posX == blockedMoves[j][0])
                                continue; // horizontal blocking
                            else if (fetchData[id].colour != squareData.colour)
                                possibleMoves.push(id);

                        }
                    }
                }
                break;
            case "queen":
                for (let i = 0; i < moves.length; i++) {

                    let id = moves[i];
                    if (fetchData[id].pawn != "") { // find blocking pawns
                        blockedMoves.push([fetchData[id].posX, fetchData[id].posY, id]);
                    }

                    else {
                        for (let j = 0; j < blockedMoves.length; j++) {
                            if (fetchData[id].posX - blockedMoves[j][0] > 0 && fetchData[id].posY == blockedMoves[j][1])
                                continue;
                            else if (fetchData[id].posY - blockedMoves[j][1] > 0 && fetchData[id].posX == blockedMoves[j][0])
                                continue;
                            else if (fetchData[id].posX - blockedMoves[j][0] == fetchData[id].posY - blockedMoves[j][1])
                                continue;
                            else if (fetchData[id].colour != squareData.colour)
                                possibleMoves.push(id);

                        }
                    }

                }
                break;
            case "king":
                for (let i = 0; i < moves.length; i++) {
                    let id = moves[i];
                    for (let j = 0; j < fetchGlobalMoves.length; j++) {
                        if (id == fetchGlobalMoves[j]) // preventing walking on checks by king
                            continue;
                        else if (fetchData[id].colour != squareData.colour)
                            possibleMoves.push(id);
                    }
                }
                break;
            case "knight":
                for (let i = 0; i < moves.length; i++) {
                    let id = moves[i];
                    if (fetchData[id].colour != squareData.colour)
                        possibleMoves.push(id);
                }
                break;

        }
        if(blockedMoves.length > 0)
            dispatch(addBlockedMoves(blockedMoves));

        possibleMoves = possibleMoves.filter(onlyUnique); // finally works
        return possibleMoves;
    }
    const finalMoves = (pawn) => {
        switch (pawn) {
            case 'pawn':
                pawnMoves();
                clearTrash();
                filterMoves('pawn');
                dispatch(addMoves(possibleMoves));
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
                filterMoves('knight');
                dispatch(addMoves(possibleMoves));
                break;
        }
    }
    const hoverMoves = (arr) => {
        if (squareData.pawn != "") { // preventing from activating on empty squares
            for (let i = 0; i < 64; i++) {
                dispatch(deleteHover(i));
            }

            for (let i = 0; i < arr.length; i++) {
                dispatch(addHover(arr[i]));
            }
        }
    }

    const movePiece = (from, to) => { // from = squareData
        dispatch(unsetPawn(from.id));
        dispatch(setPawn({ id: to.id, pawn: from.pawn, colour: from.colour }));

        for (let i = 0; i < 64; i++)
            dispatch(deleteHover(i));
        possibleMoves = [];
        if(from.colour == "white"){
            dispatch(setTurnBlack());
        }
        if(from.colour == "black"){
            dispatch(setTurnWhite());
        }
    }

    const click = () => {

        dispatch(setLast(squareData));
        if ((squareData.colour == 'white' && fetchLast.colour == 'black') || squareData.colour == 'black' && fetchLast.colour == 'white') {
            if (fetchLast.moves) { // preventing crash
                if (fetchLast.moves.includes(squareData.id))
                    movePiece(fetchLast, squareData);
            }
        }
        else if (squareData.pawn != "" && squareData.colour != fetchTurn){
            for (let i = 0; i < 64; i++)
                dispatch(deleteHover(i));
        }
        else if (squareData.pawn != "" && squareData.colour == fetchTurn) {
            switch (squareData.pawn) {
                case 'pawn':
                    finalMoves('pawn');
                    break;
                case 'rook':
                    finalMoves('rook');
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
            hoverMoves(possibleMoves);
            console.log("Koncowe ruchy: " + possibleMoves);
            dispatch(addLastMoves(possibleMoves));
        }

        else {
            if (fetchLast != "") {
                if (fetchLast.pawn != "" && fetchLast.moves) { // preventing crash
                    if (fetchLast.moves.includes(squareData.id))
                        movePiece(fetchLast, squareData);
                    else {
                        for (let i = 0; i < 64; i++) {
                            dispatch(deleteHover(i));
                        }
                    }
                    console.log(squareData.id);
                }
            }
        }


    }

    return (
        <div style={divStyle} onClick={() => { click() }}>
            {props.id}
            { notEmpty && <img style={imgStyle} src={`../../img/${fetchData[props.id].colour + fetchData[props.id].pawn}.png`}></img>}

        </div>
    )
}

export default Square;