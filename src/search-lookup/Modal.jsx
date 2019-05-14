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

  return (
    <ReactGuiContext.Consumer>
      {({ theme }) => {
        if (theme != 'material')
          require('../modal/modal-cot.css');
        else
          require('../modal/modal.css');

        return (<div>
          <div className="modalBackground">
          </div>
          
          <div className="modal">
            <div className="modalForeGroud">
              <div className='modalHeader modalHeaderSearchLookup'>
                {props.title}
                <a href="javascript:"
                  onClick={() => props.onCloseModal()}
                  className='close'
                  title="Close">
                  <i className="material-icons">close</i>
                </a>
              </div>
              <div className="modalContainer"
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