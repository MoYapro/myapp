import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'
import {Add} from './components/add'

export default class App extends Component {
  state = {
    stash: [
      {monthYear: {year: 2018, month: 0}, value: 12},
      {monthYear: {year: 2018, month: 0}, value: 88},
      {monthYear: {year: 2018, month: 1}, value: 33},
      {monthYear: {year: 2018, month: 2}, value: -5},
      {monthYear: {year: 2018, month: 3}, value: -5},
      {monthYear: {year: 2018, month: 4}, value: -5},
      {monthYear: {year: 2018, month: 5}, value: -5},
      {monthYear: {year: 2018, month: 6}, value: -5},
      {monthYear: {year: 2018, month: 7}, value: -5},
      {monthYear: {year: 2018, month: 8}, value: -5},
      {monthYear: {year: 2018, month: 9}, value: -5},
      {monthYear: {year: 2018, month: 10}, value: -5},
      {monthYear: {year: 2018, month: 11}, value: -5},
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
            <MonthsLegend/>
            <Stash stash={stash}/>
            <Add stash={stash} addMethod={this.add}/>
          </div>
      )
    }

  }