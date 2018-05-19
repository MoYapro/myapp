import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'
import {Add} from './components/add'

export default class App extends Component {
  state = {
    stash: [
      {monthYear: {month: 0, value: 100}, value: 12},
      {monthYear: {month: 1, value: 200}, value: 33},
      {monthYear: {month: 2, value: 300}, value: -5},
      {monthYear: {month: 3, value: 300}, value: -5},
      {monthYear: {month: 4, value: 300}, value: -5},
      {monthYear: {month: 5, value: 300}, value: -5},
      {monthYear: {month: 6, value: 300}, value: -5},
      {monthYear: {month: 7, value: 300}, value: -5},
      {monthYear: {month: 8, value: 300}, value: -5},
      {monthYear: {month: 9, value: 300}, value: -5},
      {monthYear: {month: 10, value: 300}, value: -5},
      {monthYear: {month: 11, value: 300}, value: -5},
    ],
    value: ''
  };

  add = (stuff) => {
    console.log(stuff);
    this.setState(({stash}) => ({
      stash: [
        ...stash,
        stuff
      ]
    }))};

    render()
    {
      const {stash} = this.state;
      return (
          <div>
            <Add stash={stash} addMethod={this.add}/>
            <MonthsLegend/>
            <Stash stash={stash}/>
          </div>
      )
    }

  }