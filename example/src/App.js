import React from 'react'
import { ActionBar,ActionBarContent, ActionBarHeader, Table, Column, ActionButton } from 'react-gui-lib'

const data = [
    {name:'Tony stark',supername:'Ironman',power:'Genius'},
    {name:'Steve Rogers',supername:'American Cap',power:'Force'},
    {name:'Thor',supername:'Thor',power:'God'},
    {name:'Thor',supername:'Thor',power:'God'},
    {name:'Thor',supername:'Thor',power:'God'},
    {name:'Thor',supername:'Thor',power:'God'},
]
export default function App(){
    return (
        <div>
            <h1>Hello react ui lite</h1>
            <p>This is an exmaple:</p>
            <ActionBar>
                <ActionBarHeader>
                    <ActionButton value='new'/>
                </ActionBarHeader>
                <ActionBarContent>
                        <label >Hero name </label>
                        <input />                        
                </ActionBarContent>
            </ActionBar>
            <Table dataSource={data}>
                <Column headerText="Name" field="name"/>
                <Column headerText="Super Name" field="supername"/>
                <Column headerText="Super Power" field="power"/>
            </Table>            
        </div>
    )
}

