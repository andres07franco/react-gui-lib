import React, { Component } from 'react';
import './paginator.css'
import {ReactGuiContext} from '../react-gui-provider'

/**
 * Componente Paginador
 */
export class Paginator extends Component {

    style = {}
    //Tiggers Settings
    maxPageTiggers = 7;

    //default values
    pageSizeOption = [10, 15, 20, 25];

    //Estilo para links deshabilitados
    disbleStyle = {
        color: '#808080',
        cursor: 'text '
    };
    
    constructor(props) {
        super(props);
        this.initState(props);
    }

    initState(props){

        var lastPageIndex = 1;
        if (props.itemsCount > 0) {
            const numPages = Math.ceil(props.itemsCount / (this.pageSize?this.pageSize:props.pageSize));
            lastPageIndex = numPages;
        }

        const tiggersOption =
            this.calculeTiggersLinks(1, props.pageSize, this.maxPageTiggers, props.itemsCount)

            this.state = {
                currentPage: props.pageNumber?props.pageNumber:1,
                itemsCount: parseInt(props.itemsCount),
                from: 1,
                pageSize: parseInt(props.pageSize),
                to: props.itemsCount < this.pageSize ? props.itemsCount : this.pageSize,
                lastPageIndex: lastPageIndex,
                showLoading: props.showLoading,
                ...tiggersOption
            };     
    }

    /**
     * Pagina hacia la anteriror pagina
     */
    prevHandle = () => {
        if (this.state.currentPage - 1 > 0)
            this.setCurrentPage(this.state.currentPage - 1);
    }

    /**
     * Pagina hacia la siguiente pagina
     */
    nextHandle = () => {
        if (this.state.currentPage + 1 <= this.state.lastPageIndex)
            this.setCurrentPage(this.state.currentPage + 1);
    }

    /**
     * Calcula los numeros de paginas a mostrat
     * @param {Number} page    Número de pagina
     * @param {Number} pageSize  Tamño de pagina
     * @param {Number} maxPageTiggers  Cantidad maxima de paginas mostrar
     * @param {Number} itemsCount  Total de registros
     */
    calculeTiggersLinks(page, pageSize, maxPageTiggers, itemsCount) {

        var firstTiggerPage, lastTiggerPage, showNextTiggers, showPrevTiggers;

        const numPages = Math.ceil(itemsCount / pageSize);
        const first = Math.floor((parseInt(page) - 1) / parseInt(maxPageTiggers)) * parseInt(maxPageTiggers) + 1;
        firstTiggerPage = page <= maxPageTiggers ? 2 : first;
        lastTiggerPage = maxPageTiggers;

        if (firstTiggerPage != 2) {
            lastTiggerPage = firstTiggerPage + maxPageTiggers - 1;
            lastTiggerPage = firstTiggerPage >= numPages - 1 ? numPages - 1 : lastTiggerPage;
        }
        else {
            lastTiggerPage = maxPageTiggers > numPages - 1 ? numPages - 1 : maxPageTiggers;
        }

        showNextTiggers = lastTiggerPage < numPages - 1;
        showPrevTiggers = firstTiggerPage - 1 >= maxPageTiggers;

        return {
            firstTiggerPage, lastTiggerPage, showNextTiggers, showPrevTiggers
        }
    }

    /**
     * Actualiza la pagina
     */
    refreshHandle = ()=>{
        this.setCurrentPage(this.state.currentPage);
    }
    /**
     * Estable la pagina en el paginador
     * Dipara el evento OnPage
     * @param {Number} page  Número de pagina
     * @param {Number} pageSize   Tamño de Pagina
     */
    setCurrentPage(page, pageSize = this.state.pageSize) {
        //calculando desde y hasta
        const { from, to } = this.calculeFromAndTo(page, pageSize);
        const lastPageIndex = Math.ceil(this.props.itemsCount / pageSize);
        const tiggersOption = this.calculeTiggersLinks(page, pageSize, this.maxPageTiggers, this.props.itemsCount)

        //setenado pagina actual
        this.setState(
            {
                currentPage: page,
                to, pageSize,
                from,
                lastPageIndex,
                ...tiggersOption
            },
            () => {
                this.props.onPage({
                    page: this.state.currentPage,
                    pageSize: this.state.pageSize
                })
            }
        );
    }

        /**
     * Estable la pagina en el paginador
     * Dipara el evento OnPage
     * @param {Number} page  Número de pagina
     * @param {Number} pageSize   Tamño de Pagina
     */
    setSizePage(page, pageSize = this.state.pageSize) {
        //calculando desde y hasta
        const { from, to } = this.calculeFromAndTo(page, pageSize);
        const lastPageIndex = Math.ceil(this.props.itemsCount / pageSize);
        const tiggersOption = this.calculeTiggersLinks(page, pageSize, this.maxPageTiggers, this.props.itemsCount)

        //setenado pagina actual
        this.setState(
            {
                currentPage: page,
                to, pageSize,
                from,
                lastPageIndex,
                ...tiggersOption
            },
            () => {
            }
        );
    }

    /**
     * Calcula el valor desde hasta que se está mostrando según la página
     * @param {Number} page  Número de pagina
     * @param {Number} pageSize   Tamño de Pagina      
     */
    calculeFromAndTo = (page, pageSize) => {
        const from = parseInt(pageSize) * parseInt(page - 1) + 1;
        let to = parseInt(from) + parseInt(pageSize) - 1;
        if (to <= pageSize) to = parseInt(pageSize);
        return { from, to }
    }

    /**
     * Genera los indeces o links de paginas
     * que se muestran el páginador
     */
    createIndexPaginationTiggers() {
        const counter = this.generatePageIndex(this.state.firstTiggerPage, this.state.lastTiggerPage)
        return counter.map((value) =>
            <a key={value}
                href="javascript:void(0)"
                style={value == this.state.currentPage ? { fontWeight: 'bold' } : {}}
                onClick={() => this.setCurrentPage(value)}>
                {value}
            </a>
        );
    }

    /**
     * 
     * @param {Number} to 
     * @param {Number} from 
     */
    generatePageIndex(to, from) {
        var indexs = [];
        for (var i = to; i <= from; i++)  indexs.push(i);
        return indexs;
    }

    /**
     * Genera los opciones de paginado
     */
    createPageSizeOptions = () => {
        return this.pageSizeOption.map((opt, i) => {
            return (
                <a key={i} href="javascript:void(0)"
                    style={opt == this.state.pageSize ? { fontWeight: 'bold' } : {}}
                    onClick={() => this.setCurrentPage(1, opt)}>
                    {opt}{i == this.pageSizeOption.length - 1 ? '' : ','}
                </a>
            )
        });

    }

    /**
     * Cuando ocurre una actualizacion del estado en el padre e hijo 
     * Este evento es llamado a actualizar el padre del componente
     * @param {Array} props Array de propiedades del componente
     */
    componentDidUpdate(props) {

        const { showLoading , itemsCount,pageSize} = this.props;
        if (props.showLoading !== showLoading) {
            this.setState({ showLoading })
        }
 
        if(props.itemsCount !== itemsCount )   {
            this.setSizePage(1);
        }
    }

    /**
     * Renderizado del componente
     */
    render() {

        return (
                                  <ReactGuiContext.Consumer>
       {({ skin }) => {
          
          style = skin.PaginataroStyle

                  return (
            <div className={style.paginator}>
                {this.props.itemsCount > this.props.pageSize &&
                    <div className={style.paginatorTiggers}>
                        <a style={this.state.currentPage == 1 ? this.disbleStyle : {}}
                            onClick={this.prevHandle}
                            href="javascript:void(0)">« Anterior</a>
                        <span>|</span>
                        <span>Página</span>
                        <span>
                            <a href="javascript:void(0)" style={1 == this.state.currentPage ? { fontWeight: 'bold' } : {}} onClick={() => this.setCurrentPage(1)}>1</a>

                            {this.state.showPrevTiggers &&
                                <a href="javascript:void(0)"
                                    onClick={() => {
                                        this.setCurrentPage(this.state.firstTiggerPage - 1);
                                    }}>...</a>
                            }

                            {this.createIndexPaginationTiggers()}

                            {this.state.showNextTiggers &&
                                <a href="javascript:void(0)"
                                    onClick={() => {
                                        this.setCurrentPage(this.state.lastTiggerPage + 1);
                                    }}>...</a>
                            }

                            <a href="javascript:void(0)"
                                style={this.state.lastPageIndex == this.state.currentPage ? { fontWeight: 'bold' } : {}}
                                onClick={() => this.setCurrentPage(this.state.lastPageIndex)}>
                                {this.state.lastPageIndex}
                            </a>
                        </span>
                        <span>|</span>
                        <a style={this.state.currentPage == this.state.lastPageIndex ? this.disbleStyle : {}}
                            href="javascript:void(0)"
                            onClick={this.nextHandle}>Siguiente »</a>
                    </div>
                }
                {this.props.itemsCount <= this.props.pageSize &&
                    <div className={style.paginatorTiggers}></div>}
                <div className={style.paginatorInfo}>
                    {this.props.itemsCount > this.props.pageSize &&
                        <div>
                            <span>Items por página: </span>
                            <span>
                                {this.createPageSizeOptions()}
                            </span>
                            <span>|</span>
                        </div>
                    }
                    <span>Mostrando {this.state.from}-{this.state.to} de {this.props.itemsCount} ítems</span>
                    <span style={{ paddingRight: '5px' }}>|</span>
                </div>
                <div>
                    
                    <div onClick={this.refreshHandle} style={{ paddingRight: '5px' }} className={style.loadingPanel}>
                        <div className={this.state.showLoading ? style.loaderxs : style.loaderStatic}></div>
                    </div>
                </div>

            </div>
                                          )
              }}
    </ReactGuiContext.Consumer>
        );
    }

}