import React from 'react';
import style from './action-button.css'

/**
 * Componente para adicionar botones
 * al action bar
 */
function ActionButton(props) {
    let className = 'icon ' + props.icon;
    return (
        <div className={style.actionButtonContent}>
            <div className={style.actionDivider}></div>
            <div className={style.actionButton} onClick={props.click}>             
                <span className={style[className]}>&nbsp;</span>
                <a href="javascript:void(0)" className={style.action} >{props.value}</a>
            </div>
        </div>
    );
}

export default ActionButton;  