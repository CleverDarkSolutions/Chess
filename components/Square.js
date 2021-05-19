const Square = (props) => {
    let divStyle = {
        width: '10em',
        height: '10em',
        background: props.background
    }
    return(
        <div style={divStyle}>
            { props.pawn !='none' && <img src={props.colour + "" + props.pawn}></img>}
        </div>
    )
}

export default Square;