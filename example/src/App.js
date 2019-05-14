import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';


import { ActionBar, ActionBarContent, ActionBarHeader,MaterialSkin,ReactGuiContext } from 'react-gui-lib'

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
      <ReactGuiContext.Provider value={{ skin:MaterialSkin }}>
       

        <h1>Hello react gui lib</h1>

        <ActionBar>
          <ActionBarHeader>
          </ActionBarHeader>
          <ActionBarContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
   onClick
            </div>
          </ActionBarContent>
        </ActionBar>


      </ReactGuiContext.Provider>
    )
  }
}


render(<App />, document.getElementById('root'));
