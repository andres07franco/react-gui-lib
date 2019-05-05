import React,{Component} from 'react';
import style from './action-bar.css';

/**
 * Componete para mostar un header
 * en el action bar
 */
class ActionBarHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {  class: ''};
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
        if(this.props.onSearch)
        this.props.onSearch(this.quickInpt.current.value)
    }

    render() {
        if(this.props.quickSearchRef){
            this.props.quickSearchRef(this.quickInpt)
        }
        const { handleExpandContent } = this.props;
        return (
            <div className={style.actionBarHeader} >
                <span className={style.expandButton} >
                    <span 
                         onClick={() => {
                             handleExpandContent(this);
                            }}>
                            <i className={style[this.state.class]} ></i>
                    </span>
                </span>
                {!this.props.hideQuickFilter && this.state.class != 'isExpanded' &&
                <span className={style.quickSearch}> 
                    <input ref={this.quickInpt} onKeyUp={this.enterKeyHandle} 
                    placeholder="Búsqueda rápida" type="text"/>
                    <span onClick={()=> this.triggerSearch()} >&nbsp;</span>
                </span>
                }
                {this.props.children}
            </div>
        )
    }
}

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
        this.setState({ open: !this.state.open});
        stateContent.setState({ class : this.state.open ? 'isExpanded' : '' });
    }

    render() {

        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { handleExpandContent: this.handleExpandContent })
        );

        return (
            <div className={style.actionBar}>
                {childrenWithProps[0]}
                <div hidden={this.state.open}>
                    {childrenWithProps[1]}
                </div>
            </div>
        )
    }
}

/**
 * Componente puro para mostrar
 * el contenido de del action bar
 * ideal para colocar filtros
 */
function ActionBarContent(props){
    return (
        <div className={style.actionBarContent} >
            {props.children}
        </div>
    )
}

export { ActionBar, ActionBarHeader, ActionBarContent };