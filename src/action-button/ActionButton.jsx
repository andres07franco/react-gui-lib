import React from 'react';
import { ReactGuiContext } from '../react-gui-provider'



/**
 * Componente para adicionar botones
 * al action bar
 */
function ActionButton(props) {
  let style = {}

  let className = style.icon + ' ' + props.icon;
  return (
    <ReactGuiContext.Consumer>
        {({ skin }) => {
          
          style = skin.ActionButtonStyle

        return (
          <div className={style.actionButtonContent}>
            <div className={style.actionDivider}></div>
            <a className={style.actionButton} onClick={props.onClick}>
              {props.imageIconUrl &&
                 <img src={props.imageIconUrl}/>
              }
              <i className="material-icons">{props.icon}</i>
              {props.value}
            </a>
          </div>
        )
      }}
    </ReactGuiContext.Consumer>
  );
}

export  default ActionButton