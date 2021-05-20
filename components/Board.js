import Square from './Square';

const Board = (props) => {
    const elementsToRender = props.arrayPawns.map((arr) => (
        <Square id={arr.id} background = {arr.background} colour={arr.colour} pawn={arr.pawn}></Square>
    ));
    return(
        <div>{elementsToRender}</div>
    )
}

export default Board;