import React from 'react'
import SearchLoockupPopup from './SearchLookupPopup.jsx'
import './SearchLookup.css'
import axios from 'axios'
import { jsonPath } from "./jsonPath";

/**
 * Componente para realizar bsuqedas avanzadas
 */
export default class SearchLoockup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPopup: false,
            data: [],
            itemsCount: 0,
            pageNumber: 1,
            pageSize: 10,
            showGridLoading: true,
            isFiltered:false,
            filterValues : {quickFilter:''}
        }
    }

    /**
     * inicializa el formulario
     * @param {any} prevProps  devuleve el estado actual de las propiedades
     */
    componentDidUpdate(prevProps, prevState) {
        const { showPopup } = this.state
        //Si show modal cambio es señal de que se desplego el modal
        if (showPopup == true && prevState.showPopup != showPopup) {
            this._loadData(this.props.settings.webMethodUrl,
                this.props.settings.apiSettings,
                null,
                null,
                {
                    pageNumber: 1,
                    pageSize: 10
                })
        }
    }

    componentDidMount(){
        let filterValues = this.state.filterValues
        const {   filterOptions, } = this.props.settings
        filterOptions.map((option)=>{
            filterValues[option.paramName] = ''
        })
        this.setState({filterValues})
    }

    _loadData = (url, apiSettings, filterOptions, orderOptions, pageOptions) => {
        axios.post(url,
            {
                query: apiSettings.query,
                variables: {
                    filtro: filterOptions,
                    orderField: null,
                    orderDirection: null,
                    pageNumber: pageOptions.pageNumber,
                    pageSize: pageOptions.pageSize
                }
            })
            .then((results) => {
                const data = jsonPath(results,apiSettings.resultJsonPath,null);
                this.setState(
                    {
                        data: data[0].items,
                        itemsCount: data[0].totalItemCount,
                        pageNumber: pageOptions.pageNumber,
                        pageSize: pageOptions.pageSize,
                        showGridLoading: false,
                    
                    }
                )
            })
    }

    handleOnSelect = (row) => {
        this.props.onChange(row)
        this.setState({ showPopup: false })
    }

    handleOnPage = (pageOptions) => {

        this.setState({ showGridLoading: true},
            () => {
                this._loadData(this.props.settings.webMethodUrl,
                    this.props.settings.apiSettings,
                    null,
                    null,
                    {
                        pageNumber: pageOptions.page,
                        pageSize: pageOptions.pageSize,
                    }
                )
            })
    }

/**
 * Maneja el evento de ordernar en ela grilla
 * actuliza el ordenado
 */
  /*  handleOnOrderColumn = (orderOptions) => {

        const { filterOptions, pageOptions } = this.props
        TipoCargaService.instance
            .getData(filterOptions, orderOptions, pageOptions)
            .then((data) => 
                this.props.boundOrderGrid(orderOptions, data.items )
            )
    }*/

    handleOnChangeFilterValue = (paramName,value) =>{
        let {filterValues} = this.state
        filterValues[paramName] = value;
        this.setState({filterValues})
    }

    handleOnSearch = () =>{
        const {filterValues} = this.state
        let isFiltered = false

        let _filteValues = Object.assign({}, filterValues);

        if (this.quickSerarchRef.current != null 
            && this.quickSerarchRef.current.value != null
            && this.quickSerarchRef.current.value != '') {

            Object.keys(_filteValues).map((key)=> _filteValues[key] = '' ) 

            _filteValues.quickFilter = this.quickSerarchRef.current.value
            isFiltered = true
        }
        else{
            Object.keys(filterValues).map((key)=>{
                if(filterValues[key]!='' && filterValues[key]!= null)
                isFiltered = true
            })            
        }

        this.setState({ showGridLoading: true,   isFiltered },
            () => {
                this._loadData(this.props.settings.webMethodUrl,
                    this.props.settings.apiSettings,
                    _filteValues,
                    null,
                    {
                        pageNumber: 1,
                        pageSize: 10,
                    }
                )
            })
    }

    handleOnClear = () =>{
        let {filterValues} = this.state
        Object.keys(filterValues).map((key)=>{
            filterValues[key] = ''
        })

        if (this.quickSerarchRef.current != null ) 
            this.quickSerarchRef.current.value = ''

        this.setState({ showGridLoading: true, filterValues,  isFiltered : false},
            () => {
                this._loadData(this.props.settings.webMethodUrl,
                    this.props.settings.apiSettings,
                    this.state.filterValues,
                    null,
                    {
                        pageNumber: 1,
                        pageSize: 10,
                    }
                )
            })
    }

    render() {

        let { showPopup,
            data,
            pageNumber,
            pageSize,
            showGridLoading,
            itemsCount,
            filterValues,
            isFiltered } = this.state

        const { value, 
                settings, 
                inputClassName } = this.props

        const { columnSettings,
                filterOptions,
                fieldText, } = settings

        //formateamos el valor dependiendo de si es un objeto o un string 
        let inputValue = '(Seleccionar)'
        if (value != '' && value != null) {
            if (value instanceof Object && fieldText)
                inputValue = value[fieldText]
            else
                inputValue = value
        }

        return (
            <div>
                <SearchLookupInput
                    value={inputValue}
                    inputClassName={inputClassName}
                    onClick={() => this.setState({ showPopup: true })}
                    onClear={() => this.props.onChange(null)}
                />
                {showPopup &&
                    <SearchLoockupPopup
                        columns={columnSettings}
                        selectedRow={value}
                        filters={filterOptions}
                        data={data}
                        filterValues={filterValues}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        showGridLoading={showGridLoading}
                        itemsCount={itemsCount}
                        isFiltered={isFiltered}
                        quickSearchRef={(ref) => this.quickSerarchRef = ref}
                        onQuickSearch={this.handleOnSearch} 
                        onSelect={this.handleOnSelect}
                        onChangeFilterValue={this.handleOnChangeFilterValue}
                        onClosePopup={() => {
                            this.setState({ showPopup: false })
                        }}
                        onPage={this.handleOnPage}
                        onSearch={this.handleOnSearch}
                        onClearFilter={this.handleOnClear}
                    />
                }
            </div>
        )
    }
}

/**
 * Componente pque rederiza el cotrol
 * con un boton de limpiado
 * @param {*} props 
 */
const SearchLookupInput = (props) => (
    <div className={'searchLookup ' + props.inputClassName}>
        <a href="javascript:void(0)"
            onClick={props.onClick}>
            {props.value}
        </a>
        <a href="javascript:void(0)"
            onClick={props.onClear}
            className="clear" >&nbsp;</a>
    </div>
)