import React from 'react'
import { ActionBar, ActionBarHeader, ActionBarContent } from '../action-bar/ActionBar.jsx'
import { Table, Column } from '../table/Table.jsx'
import { Paginator } from '../paginator/Paginator.jsx'
import MessageFilter from '../message-filter/MessageFilter.jsx'
import Modal from './Modal.jsx'
import InputBox from '../input-box/InputBox.jsx'
import Button from '../button/Button.jsx'


/**
 * Componete que despliega un popcup
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
    <Modal title='Search hero' onCloseModal={onClosePopup} >


      <ActionBar>
        <ActionBarHeader
          quickSearchRef={props.quickSearchRef}
          onSearch={props.onQuickSearch}
        />
        <ActionBarContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              <Button text='Buscar' onClick={onSearch} />
            </div>
          </div>
        </ActionBarContent>
      </ActionBar>
      {isFiltered &&
        <MessageFilter message="Se ha aplicado un filtro."
          onClickClose={onClearFilter}
        />
      }
      <Table
        onSelectRow={onSelect}
        selectedRow={selectedRow}
        dataSource={data}>
        {columns.map((col, i) =>
          <Column key={i}
            headerText={col.header}
            field={col.columnDef}
          />
        )}
        <Paginator
          onPage={onPage}
          pageNumber={pageNumber}
          pageSize={pageSize}
          showLoading={showGridLoading}
          itemsCount={itemsCount}
        />
      </Table>


    </Modal>
  )
}



/**
 * Componente que mustra un campo de filtro con su label
 * @param {any} props 
 */
const FilterRow = (props) => (
  <InputBox
    name={props.paramName}
    label={props.paramLabel}
    autoComplete='off'
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
    onKeyUp={props.onKeyUp}
  />


)

export default SearchLookupPopup