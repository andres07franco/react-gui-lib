import React from 'react'
import { ReactGuiContext } from '../react-gui-provider'


/**
 * Componente que mustra una caja de texto
 * con un lable
 */
const InputBox = React.forwardRef((props, ref)  => {
  let style={}
  return (
    <ReactGuiContext.Consumer>
       {({ skin }) => {
          
          style = skin.InputBoxStyle

        return (
          <div className={style.inputBox}>        
            <input
              type={props.type?props.type:'text'}
              ref={ref}
              required
              value={props.value}
              name={props.name}
              onChange={props.onChange}
              type={props.type}
              className={props.className}
              style={props.style}
              onKeyUp={props.onKeyUp}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
              autoComplete={props.autoComplete}
            />

            <span className={style.highlight}></span>
            <span className={style.bar}></span>
            {props.label &&
              <label>{props.label}</label>
            }
          </div>)
      }}
    </ReactGuiContext.Consumer>
  )
})


export default InputBox 