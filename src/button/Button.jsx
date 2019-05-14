import React from 'react'
import { ReactGuiContext } from '../react-gui-provider'

const style = {
  button: 'button'
}
/**
 * Componente que mustra un boton
 */
const Button = (props) => {
  let style = {}

  return (
    <ReactGuiContext.Consumer>
        {({ skin }) => {
          
          style = skin.ButtonStyle
        return (
          <button
            type="button"
            className={style.button}
            disabled={props.disabled}
            onClick={props.onClick} >
            {props.text}
          </button>
        )
      }}
    </ReactGuiContext.Consumer>
  )
}
export default Button 