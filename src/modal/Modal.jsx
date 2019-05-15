import React, { Component } from 'react';

import { ReactGuiContext } from '../react-gui-provider'

  let style ={}
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
    top: `calc(50% - ${heightModal / 2}px)`,

  }

  const modalmodalContainerStyle = {
    width: 'auto',
    height: 'auto',
    display: 'flex'
  }

  return (
    <ReactGuiContext.Consumer>
       {({ skin }) => {
          
          style = skin.ModalStyle

        return (<div>
          {showModal &&
            <div>
              <div className={style.modalBackground}>
              </div>
              <div className={style.modal}>
                <div className={style.modalForeGroud}
                >
                  <div className={style.modalContainer}
                    style={modalmodalContainerStyle}>
                    <div className={style.modalHeader}>
                      {title}
                      <a href="javascript:"
                        onClick={() => !showLoading && onCloseModal()}
                        className={style.close}
                        title="Close">
                        <i className="material-icons">close</i>
                      </a>
                    </div>
                    {childrenWithProps[0]}
                    <div className={style.modalButtons}>
                      <div>
                        {showLoading &&
                          <div
                            style={{ paddingRight: '5px' }}
                            className={style.loadingPanel}>
                            <div className={style.loaderxs} ></div>
                          </div>
                        }
                        <span className={style.modalLegend}>
                          * - Indica un campo obligatorio
                                        </span>
                        {showErrorMessage &&
                          <span className={style.modalError}  >
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
        </div>)
      }}
    </ReactGuiContext.Consumer>
  )
}

/**
 * Contenido del modal
 * @param {any} props 
 */
const ModalContent = (props) => (
  <div className={style.modalContent} >
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
  )
}

export { Modal, ModalContent, ModalButtons };