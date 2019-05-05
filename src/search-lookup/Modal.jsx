import React from 'react'
import '../modal/modal.css'

function Modal(props){
        //Configurando dimensiones por defecto del modal
        const heightModal = 340
        const widthModal = 700
    
        const foreGroudStyle = {
            left: `calc(50% - ${widthModal / 2}px)`,
            top: `calc(50% - ${heightModal / 2}px)`
        }
    
        const modalPlaceholderStyle = {
            width: widthModal,
            height: 'auto',
        }
    
    return (
        <div>
            <div className="ModalBackground">
            </div>
            <div className="foreGroud"
                 style={foreGroudStyle}>
                <div className="ModalPlaceholder"
                     style={modalPlaceholderStyle}>
                     <div >
                            {props.children}
                     </div>               
                </div>
            </div>
        </div>
    )
}

export default Modal