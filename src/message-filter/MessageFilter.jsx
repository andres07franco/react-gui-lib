import './MessageFilter.css'
import React from 'react';

/**
 * Componente para mostar mensajes de información
 * al realizar un filtrado de datos
 * @param {any} props 
 */
const MessageFilter = (props) => (
    <div className="info-message" >
        <span className="info-message-icon">&nbsp;</span>
        {props.message}
        <a href="javascript:" onClick={props.onClickClose} className="close" title="Cerrar">&nbsp;</a>
    </div>
)

export default MessageFilter