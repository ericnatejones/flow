import React from 'react'

function River (props) {
    let riverStyle = {
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "2px",
        paddingTop: "20px",
    }

    return <div onClick={props.handleActionFavorite} id={props.item._id} style={riverStyle} className="river-item">{props.item.knownTitle}</div>

}

export default River;
