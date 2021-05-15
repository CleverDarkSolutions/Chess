import Square from 'Square';

const Board = (props) => {
    const elementsToRender = props.arrayPawns.map((colour,id,pawn) => (
        <Square colour={colour} id={id} pawn={pawn}></Square>
    ));
    return(
        <div>{elementsToRender}</div>
    )
}

export default Board;