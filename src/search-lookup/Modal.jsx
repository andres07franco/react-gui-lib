import React from 'react'
import { ReactGuiContext } from '../react-gui-provider'

function Modal(props) {
  //Configurando dimensiones por defecto del modal
  const heightModal = 300
  const widthModal = 400

  const modalForeGroudStyle = {
    left: `calc(50% - ${widthModal / 2}px)`,
    top: `calc(50% - ${heightModal / 2}px)`
  }

  const modalContainerStyle = {
    width: 'auto',
    height: 'auto',
  }
  let style = {}
  return (
    <ReactGuiContext.Consumer>
        {({ skin }) => {
          
          style = skin.ModalStyle

          const modalheaderStyle = style.modalHeader + " " + style.modalHeaderSearchLookup

        return (<div>
          <div className={style.modalBackground}>
          </div>
          
          <div className={style.modal}>
            <div className={style.modalForeGroud}>
              <div className={modalheaderStyle}>
                {props.title}
                <a href="javascript:"
                  onClick={() => props.onCloseModal()}
                  className={style.close}
                  title="Close">
                  <i className="material-icons">close</i>
                </a>
              </div>
              <div className={style.modalContainer}
                style={modalContainerStyle}>
                <div >
                  {props.children}
                </div>
              </div>
            </div>
           </div>
        </div>
        )

      }}
    </ReactGuiContext.Consumer>

  )
}

export default Modal