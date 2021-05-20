const Square = (props) => {
    let divStyle;
    if(props.background == "white"){
    divStyle = {
        width: '7em',
        height: '7em',
        background: '#FFEBCD',
        float: 'left'
    }
}
    if(props.background == "black"){
        divStyle = {
            width: '7em',
            height: '7em',
            background: '#D2691E',
            float: 'left'
        }
    }
    return(
        <div style={divStyle}>
            { props.pawn !='none' && <img src={props.colour + "" + props.pawn + ".jpg"}></img>}
        </div>
    )
}

export default Square;