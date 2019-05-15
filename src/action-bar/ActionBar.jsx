import React, { Component } from 'react';
import { ReactGuiContext } from '../react-gui-provider'

let style = {}
/**
 * Componente para mostar un contenido
 * en el action bar
 */
class ActionBar extends Component {



  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  /**
   * Manejador de evento de expación
   * oculta o muestra el contendio del
   * action bar
   */
  handleExpandContent = (stateContent) => {
    this.setState({ open: !this.state.open });
    stateContent.setState({ class: this.state.open ? style.isExpanded : '' });
  }

  render() {

    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { handleExpandContent: this.handleExpandContent })
    );

    return (
      <ReactGuiContext.Consumer>
        {({ skin }) => {
          
          style = skin.ActionBarStyle

          return (
            <div className={style.actionBar}>
              {childrenWithProps[0]}
              <div hidden={this.state.open}>
                {childrenWithProps[1]}
              </div>
            </div>
          )
        }}
      </ReactGuiContext.Consumer>

    )
  }
}

/** 
 * Componete para mostar un header
 * en el action bar
 */
class ActionBarHeader extends Component {

  constructor(props) {
    super(props);
    this.state = { class: '' };
    this.quickInpt = React.createRef();
  }

  /**
   * Manaja el evento de la tecla enter
   * cada que presione enter en alguno de los formularios
   * actualiza la grilla
   */
  enterKeyHandle = (target) => {
    if (target.keyCode == 13) {
      this.triggerSearch();
    }
  }

  triggerSearch = () => {
    if (this.props.onSearch)
      this.props.onSearch(this.quickInpt.current.value)
  }

  render() {
    if (this.props.quickSearchRef) {
      this.props.quickSearchRef(this.quickInpt)
    }
    const { handleExpandContent } = this.props;
    return (
      <div className={style.actionBarHeader} >
        <span className={style.expandButton} >
          <span onClick={() => {
            handleExpandContent(this);
          }}>
            <i className={style[this.state.class]} ></i>
          </span>
        </span>
        {!this.props.hideQuickFilter && this.state.class != style.isExpanded &&
          <div className={style.quickSearch}>
            <div className={style.inputBoxQuick}>
              <input ref={this.quickInpt} placeholder="Búsqueda rápida" type="text" onKeyUp={this.enterKeyHandle} />
              <span className={style.highlight}></span>
              <span className={style.bar}></span>
            </div>
            <span onClick={() => this.triggerSearch()} >&nbsp;</span>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}


/**
 * Componente puro para mostrar
 * el contenido de del action bar
 * ideal para colocar filtros
 */
function ActionBarContent(props) {
  return (
    <div className={style.actionBarContent} >
      {props.children}
    </div>
  )
}

export { ActionBar, ActionBarHeader, ActionBarContent };