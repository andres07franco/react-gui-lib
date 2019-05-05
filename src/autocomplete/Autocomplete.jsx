import React from 'react'
import './Autocomplete.css'

/**
 * Control de autocompletado
 */
export default class Autocomplete extends React.Component {

    constructor(props) {
        super(props)        
        this.state = {
            rows: props.data instanceof Function ? [] : props.data,
            topList:0,
            leftList:0,
            showList:false,
            rowIndexHover:0,
            minWidth:0
        }
        this.inputRef = React.createRef()
        this._isMounted = false;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    /**
     * Realiza el filtrado de datos 
     * que se mostrara en el listado
     */
    onChangeHandle = (e) => {
        const value = e.target.value
        if(this.props.fieldText){
            var vValue = {}
            vValue[this.props.fieldText] = value
            this.props.onChange(vValue)
        }
        else{
            this.props.onChange(value)
        }
        this._getData(value)
    }

    /**
     * Establece los valores al hacer click
     * en alguno de los items del listado
     */
    onSelectRowHandle = (row) => {            
        const value =  row
        this.props.onChange(value)
        this.setState({showList : false,rowIndexHover:0})
    }

    /**
     * Obtiene la informacion a mostrar
     */
    _getData = (value) =>{
        if (this.props.data instanceof Function) {            
            this.props.data(value, 1, 10)
                .then((rows) => {
                   this._setAutocompletePosition(rows)
                })
        }
        else {
            if (this.props.data.length > 0) {
                const rows = this.props.data.filter(item => {
                   return item.name.toLowerCase()
                                   .includes((value)
                                   .toLowerCase())
                });
                this._setAutocompletePosition(rows)
            }
        }
    }
    /**
     * Establece la posición donde se desplegara
     * el listado
     * @param {any} rows 
     */
    _setAutocompletePosition(rows){
        const { top,
                left,
                height,
                width } = this.inputRef.current.getBoundingClientRect()
        this.setState({ rows , 
                        topList : top + height,
                        leftList : left ,
                        minWidth: width,
                        showList: true })
    }

    /**
     * Maneja el evento de cuando se pierde el foco
     */
    blurHandle = (e)=>{
        if(this._isMounted){
            //fix para cundo se pierde el foco seleccionado del lsitado
            if(this.state.showList === true)
               setTimeout( ()=>this.setState({showList : false}),200)
        }
    }

    /**
     * Despliega el evento cuando se obtiene el foco
     */
    focusHandle = (e)=>{ 
        this._getData(this.inputRef.current.value)
    }

    /**
     * Maneja los eventos de felcha arriba y abajo
     */
    keyHandle = (target) => {
        
        const { rowIndexHover, rows ,showList } =  this.state        
        if(!showList) return
        switch(target.keyCode){
            case 40:  //Flecha abajo
                if(rowIndexHover < rows.length - 1 )
                    this.setState({rowIndexHover :rowIndexHover + 1})
            break;
            case 38: //Flecha arriba
                if(rowIndexHover > 0)
                this.setState({rowIndexHover :rowIndexHover - 1 })
            break;            
            case 13: //Enter
                if(rowIndexHover>=0)
                this.onSelectRowHandle(rows[rowIndexHover]);
            break;
        }   
             
    }

    render() {       
        const { renderItem,name,mapInputRef,fieldText,value, inputClassName } = this.props
        
        //seteamos referencia en caso de ser solicitada
        if(mapInputRef) mapInputRef(this.inputRef)

        //formateamos el valor dependiendo de si es un objeto o un string 
        let inputValue = ''
        if (value!='' && value != null) {
            if(value instanceof Object && fieldText) 
                inputValue = value[fieldText]
            else 
                inputValue = value
        }

        return (
                <div>
                    <input ref={this.inputRef}
                            autoComplete="off"
                            type="text"
                            className={inputClassName}
                            value={inputValue}
                            name={name}                            
                            onChange={this.onChangeHandle} 
                            onBlur={this.blurHandle}
                            onFocus={this.focusHandle}
                            onKeyUp={this.keyHandle}/>
                        {this.state.showList &&
                            <AutocompleteList rows={this.state.rows}
                                fieldText={fieldText}
                                rowIndexHover={this.state.rowIndexHover}
                                onSelectRowHandle={this.onSelectRowHandle}
                                renderItem={renderItem}
                                minWidth={this.state.minWidth}
                                top={this.state.topList}
                                left={this.state.leftList} />
                        }
                </div>
        )
    }
}

/**
 * Lista desplegable
 * @param {any} props 
 */
const AutocompleteList = (props) => (
    <ul style={{top:props.top,left:props.left,width:props.minWidth}} 
        className="AutocompleteList">
        {props.rows.map((row, i) =>
            <li key={i} 
                className={i === props.rowIndexHover?'hover':''} 
                onClick={()=> {props.onSelectRowHandle && props.onSelectRowHandle(row)}}
                >      
                 {props.fieldText && row[props.fieldText]}
                 {!props.fieldText && row}
            </li>
        )}
    </ul>
)