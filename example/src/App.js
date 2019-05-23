import React, { Component } from 'react';
import { render } from 'react-dom';

import { ActionBar, 
  ActionBarContent, 
  ActionBarHeader,
  WinxpSkin,
  MaterialSkin,
  ReactGuiContext,
  InputBox,
  Table, Column , Button, Autocomplete, SearchLookup,Paginator, 
  Modal,ModalContent,
  ModalButtons,ActionButton  } from 'react-gui-lib'

import { data, sl_settings } from './data.js'

const superNames = [
  'thor', 'ironman', 'balc widow', 'falcon', 'cap', 'spiderman'
]


export default class App extends Component {

  constructor(props) {
    super(props)
        let dataFilter = data.slice(0, 5)

    this.state = {
      data: dataFilter,
      pageNumber: 1,
      pageSize: 5,
      itemsCount: data.length,
      showGridLoading: false,
      showModal: false,
      supername: '',
      name: ''
    }
  }

  handleOnPage = (pageOptions) => {

    let dataFilter = data.slice((pageOptions.page - 1) * pageOptions.pageSize, (pageOptions.page) * pageOptions.pageSize)

    this.setState({ showGridLoading: true })
    setTimeout(() => {
      this.setState({
        pageNumber: pageOptions.page,
        pageSize: pageOptions.pageSize,
        data: dataFilter,
        showGridLoading: false,


      })
    }, 1000)
  }

  render() {
    return (
  <div>
        <Modal showModal={this.state.showModal}
          title="Avengers Form"
          onCloseModal={() => this.setState({ showModal: false })}>
          <ModalContent>
            <form >
          
              <InputBox label="Nombre" />
              <Autocomplete
                label="Super name"
                data={superNames}
                name="supername"
                value={this.state.supername}
                onChange={(supername) => this.setState({ supername })}
              />
              <SearchLookup
                label='Power'
                data={data}
                settings={sl_settings}
                value={this.state.name}
                onChange={(name) => this.setState({ name })}
              />
          
            </form>
          </ModalContent>
          <ModalButtons >
            <Button text='Cancelar' />
            <Button text='Aceptar' />
          </ModalButtons>
        </Modal>

        <h1>Hello react gui lib</h1>

        <ActionBar>
          <ActionBarHeader>
            <ActionButton
              icon='add'
              value='New'
              onClick={() => this.setState({ showModal: true })} />
            <ActionButton icon='edit' value='Edit' />
            <ActionButton icon='delete' value='Remove' />
          </ActionBarHeader>
          <ActionBarContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <InputBox label="Nombre" />
                <InputBox label="Super Nombre" />
              </div>
              <div >
                <Button text='Buscar' />
              </div>
            </div>
          </ActionBarContent>
        </ActionBar>

        <Table dataSource={this.state.data}>
          <Column headerText="Name" field="name" />
          <Column headerText="Super Name" field="supername" />
          <Column headerText="Super Power" field="power" />
          <Paginator
            onPage={this.handleOnPage}
            pageNumber={this.state.pageNumber}
            pageSize={this.state.pageSize}
            showLoading={this.state.showGridLoading}
            itemsCount={this.state.itemsCount}
          />
        </Table>
        </div>
    
    )
  }
}


render(<App />, document.getElementById('root'));
