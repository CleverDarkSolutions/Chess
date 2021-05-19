import Square from './Square';

const Board = (props) => {
    const elementsToRender = props.arrayPawns.map((colour,pawn, background) => (
        <Square background = {background} colour={colour} pawn={pawn}></Square>
    ));
    return(
        <div>{elementsToRender}</div>
    )
}

export default Board;