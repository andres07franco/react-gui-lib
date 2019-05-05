import React from 'react'
import Modal from './Modal.jsx'
import { ActionBar, ActionBarHeader, ActionBarContent } from '../action-bar/action-bar'
import { Table, Column } from '../table/table'
import { Paginator } from '../paginator/paginator'
import MessageFilter from '../message-filter/MessageFilter.jsx'

const TABLE_STYLE = {
    border: 1,
    borderColor: '#6f9dd9',
    borderTop: 0,
    borderBottom: 0,
    borderStyle: 'solid'
}

/**
 * Componete que de3spliega un popcup
 * para realizar bsuquedas avanzadas de datos
 * @param {any} props 
 */
function SearchLookupPopup(props) {
    const {
        filters,
        data,
        columns,
        onSelect,
        pageNumber,
        pageSize,
        showGridLoading,
        itemsCount,
        filterValues,
        isFiltered,
        selectedRow,

        onPage,
        onSearch,
        onChangeFilterValue,
        onClosePopup,
        onClearFilter,
    } = props

    return (
        <Modal>
            <HeaderBar onClosePopup={onClosePopup} />
            <ActionBar>
                <ActionBarHeader 
                        quickSearchRef={props.quickSearchRef}
                        onSearch={props.onQuickSearch} 
                />
                <ActionBarContent>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div>
                            {filters.map((filter, i) =>
                                <FilterRow
                                    key={i}
                                    index={i}
                                    paramLabel={filter.paramLabel}
                                    paramName={filter.paramName}
                                    value={filterValues[filter.paramName]}
                                    onChange={(value) => 
                                        onChangeFilterValue(filter.paramName, value)
                                    }
                                    onKeyUp={(target) => {
                                        if (target.keyCode == 13) 
                                        onSearch()
                                    }}
                                />
                            )}
                        </div>
                        <div>
                            <button type="button" onClick={onSearch}>Buscar</button>
                        </div>                              
                    </div>
                </ActionBarContent>
            </ActionBar>
            {isFiltered   &&                
                <MessageFilter message="Se ha aplicado un filtro."
                                onClickClose={onClearFilter}
                />
            }
            <Table
                style={TABLE_STYLE}
                onSelectRow={onSelect}
                selectedRow={selectedRow}
                dataSource={data}>
                {columns.map((col, i) =>
                    <Column key={i}
                        headerText={col.header}
                        field={col.columnDef}
                    />
                )}
            </Table>
            <Paginator
                onPage={onPage}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showLoading={showGridLoading}
                itemsCount={itemsCount}
            />
        </Modal>
    )
}

/**
 * Compnenete que mustra una barra en la cabecera
 * junto con el boton de cerrar
 * @param {any} props 
 */
const HeaderBar = (props) => (
    <div style={{ display: 'flex', 
                flexDirection: 'row-reverse', 
                border: 1, 
                borderColor: '#6f9dd9', 
                borderStyle: 'solid', 
                borderBottom: 0 }}>
        <a href='javascript:void(0)'
            style={{ padding: 2, paddingRight: 5, color: 'black', fontWeight: 'bold' }}
            onClick={() => props.onClosePopup()}>
            X
        </a>
    </div>
)

/**
 * Componente que mustra un campo de filtro con su label
 * @param {any} props 
 */
const FilterRow = (props) => (
    <div className="form-row" >
        <label>{props.paramLabel}</label>
        <input name={props.paramName}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)} 
            onKeyUp = {props.onKeyUp}
        />
    </div>
)

export default SearchLookupPopup