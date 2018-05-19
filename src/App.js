import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'

export default class App extends Component {
  state = {
    stash: [
      {monthYear: {year: 2018, month: 0}, value: 12, note: 'Kino'},
      {monthYear: {year: 2018, month: 0}, value: 88, note: 'Urlaub'},
      {monthYear: {year: 2018, month: 1}, value: 33, note: 'Urlaub'},
      {monthYear: {year: 2018, month: 2}, value: -5, note: 'Klamotten'},
      {monthYear: {year: 2018, month: 3}, value: -5, note: 'Ausflug'},
      {monthYear: {year: 2018, month: 4}, value: 0, note: ''},
      {monthYear: {year: 2018, month: 5}, value: -5, note: 'Spielzeug'},
      {monthYear: {year: 2018, month: 6}, value: -5, note: 'Eis'},
      {monthYear: {year: 2018, month: 7}, value: -5, note: 'Spaß haben'},
      {monthYear: {year: 2018, month: 8}, value: -5, note: ''},
      {monthYear: {year: 2018, month: 9}, value: -5, note: '4711'},
      {monthYear: {year: 2018, month: 10}, value: -5, note: 'Hier haben wir einfach mal so Geld zum Heizen gebraucht'},
      {monthYear: {year: 2018, month: 11}, value: -5, note: 'Bananen'},
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
            <Stash stash={stash} addMethod={this.add}/>
          </div>
      )
    }

  }