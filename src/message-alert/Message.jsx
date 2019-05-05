import './Message.css'
import React from 'react'

/**
 * Componente utilizado para mostrar mensajes de tipo
 * alerta, informativo y error
 */
const Message = (props) => {
    if (props.showMessage)
        return (<div className={` alert-dismissable ${props.messageType}`}>
            {props.message}
            <a className="close" onClick={props.onCloseHandle}>&nbsp;</a>
        </div>)
    else return (<div></div>)
}


export default Message
