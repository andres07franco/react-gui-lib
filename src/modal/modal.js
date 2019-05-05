import React, { Component } from 'react';
import './modal.css'

/**
 * Componente para mostrate un modal
 */
const Modal = (props) => {

    const {
        children,
        width,
        height,
        onCloseModal,
        title,
        showModal,
        showErrorMessage,
        showLoading
    } = props;

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child)
    );

    //Configurando dimensiones por defecto del modal
    const heightModal = height ? height : 300
    const widthModal = width ? width : 400

    const foreGroudStyle = {
        left: `calc(50% - ${widthModal / 2}px)`,
        top: `calc(50% - ${heightModal / 2}px)`
    }

    const modalPlaceholderStyle = {
        width: widthModal,
        height : heightModal
    }

    return (
        <div>
            {showModal &&
                <div>
                    <div className="ModalBackground">
                    </div>
                    <div className="foreGroud" style={foreGroudStyle}>
                        <div className="ModalPlaceholder" style={modalPlaceholderStyle}>
                            <div className="formModal">
                                <p className="cot-dialog-form-header">
                                    {title}
                                    <a href="javascript:"  onClick={()=>!showLoading && onCloseModal()}
                                        className="close" title="Cerrar">
                                        &nbsp;
                                    </a>
                                </p>
                                {childrenWithProps[0]}
                                <div className="cot-dialog-form-buttons" >
                                    <div>
                                        {showLoading &&
                                            <div
                                                style={{ paddingRight: '5px' }}
                                                className="loadingPanel">
                                                <div className={"loaderxs"} ></div>
                                            </div>
                                        }
                                        <span>
                                            * - Indica un campo obligatorio
                                        </span>
                                        {showErrorMessage &&
                                        <span style={{ color: 'red' }} >
                                            <br />
                                            &nbsp; - Los campos en rojo son requeridos
                                        </span>
                                        }                                        
                                    </div>
                                    <div>
                                        {childrenWithProps[1]}
                                    </div>                                                                      
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

/**
 * Contenido del modal
 * @param {any} props 
 */
const ModalContent = (props) => (
    <div className="cot-dialog-form-container" >
        {props.children}
    </div>
)


/**
 * Zona de botones para el modal
 * @param {any} props 
 */
const ModalButtons = (props) => {
    const { children } = props;
    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, { disabled: props.disabled })
    );

    return (
    <span>
        {childrenWithProps}
    </span>
)}

export { Modal, ModalContent, ModalButtons };