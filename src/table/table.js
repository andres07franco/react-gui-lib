import React, { Component } from 'react';
import style from'./table.css'
/**
 * Componente para mostrar tablas
 */
export class Table extends Component {

    constructor(props) {
        super(props);
        //Seteamos datasource
        this.state = { 
           // selectedRow : {},
            columnOrder : '',
            orderDirection : ''
         };
    }

    calculeOrder = (column)=>{

        let orderDirection = this.state.orderDirection
        let columnOrder = column;

        switch(this.state.orderDirection){
            case '':   orderDirection = 'asc' 
                    break;
            case 'asc':   orderDirection = 'desc' 
                    break;
            case 'desc':   orderDirection = ''
                           columnOrder = ''
                    break;


        }
        this.setState({columnOrder,orderDirection},
            ()=>{
                const {columnOrder,orderDirection} = this.state
                if(this.props.onOrderColumn)
                     this.props.onOrderColumn({columnOrder,orderDirection})
            })
    }

    /**
     * Genera los header de la grilla
     */
    generateHeadersRows() {
        const columns = this.props.children.map((col, i) =>
            <th key={i}>
                <a href="javascript:void(0)"
                   onClick={()=>{this.calculeOrder(col.props.field)}}>
                        {col.props.headerText}
                        { this.state.columnOrder == col.props.field &&
                        <span className={style["orderDirection" + this.state.orderDirection]}>
                        </span>   
                        }
                </a>                         
            </th>
        );
        return (<thead>
                    <tr>{columns}</tr>
                </thead>);
    }

    /**
     * Genera las filas a mostrar en la grilla
     */
    generateDataRows() {
        
        const {children,dataSource,selectedRow} = this.props;
        const cols = children.map((col) => col.props.field ) ;

        const rows = dataSource.map((row, i) =>
            <tr key={i} onClick={()=>{ 
                                // this.setState({selectedRow:row})
                                 if(this.props.onSelectRow)
                                     this.props.onSelectRow(row);
                         }}
                className={style[selectedRow && selectedRow.id == row.id?'RowCodSelected':'']}
                >

                {cols.map((colName,j)=>{
                     return  (<td key={j}>{row[colName]}</td>)
                     
                    }
                )}



            </tr>
        );
        return (
            <tbody>{rows}</tbody>
        );
    }

    /**
     * Cuando ocurre una actualizacion del estado en el padre e hijo 
     * Este evento es llamado a actualizar el padre del componente
     * @param {Array} props Array de propiedades del componente
     */
    componentDidUpdate(props) {

        const { selectedRow} = this.props;
 
        if(props.selectedRow != selectedRow )   {
            this.setState({selectedRow})
        }
    }

    render() {
        return (
            <div style={this.props.style} className={style.table}>  
                <table cellSpacing="0">
                    {this.generateHeadersRows()}
                    {this.generateDataRows()}
                </table>
            </div>
        );
    }
}

/**
 * Componente para setear
 * propiedades de las columnas
 */
export function Column() {
        return ('');
 }


