const Square = (props) => {
    let divStyle;
    let notEmpty;
    if (props.colour && props.pawn)
        notEmpty = true;
    let imgStyle = {
        width: '5em',
        height: '5em',
        paddingTop: '1.5em'
    }
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
            { notEmpty && <img style={imgStyle} src={`../../img/${props.colour+props.pawn}.png`}></img>}
        </div>
    )
}

export default Square;