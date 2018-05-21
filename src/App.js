import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'

export default class App extends Component {
  state = {
    stash: [
      {id: 1, monthYear: {year: 2018, month: 0}, value: 12, repeated: true, note: 'Kino'},
      {id: 2, monthYear: {year: 2018, month: 0}, value: 88, repeated: true, note: 'Urlaub'},
      {id: 2, monthYear: {year: 2018, month: 0}, value: -666, repeated: false, note: 'Tierarzt'},
      {id: 3, monthYear: {year: 2018, month: 1}, value: 33, repeated: true, note: 'Urlaub'},
      {id: 4, monthYear: {year: 2018, month: 2}, value: -5, repeated: true, note: 'Klamotten'},
      {id: 5, monthYear: {year: 2018, month: 2}, value: 10, repeated: true, note: 'Reiten'},
      {id: 6, monthYear: {year: 2018, month: 3}, value: -5, repeated: true, note: 'Ausflug'},
      {id: 7, monthYear: {year: 2018, month: 4}, value: 0, repeated: true, note: ''},
      {id: 8, monthYear: {year: 2018, month: 5}, value: -5, repeated: true, note: 'Spielzeug'},
      {id: 9, monthYear: {year: 2018, month: 6}, value: -5, repeated: true, note: 'Eis'},
      {id: 10, monthYear: {year: 2018, month: 8}, value: -5, repeated: true, note: ''},
      {id: 11, monthYear: {year: 2018, month: 9}, value: -5, repeated: true, note: '4711'},
      {id: 12, monthYear: {year: 2018, month: 10}, value: -5, repeated: true, note: 'Hier haben wir einfach mal so Geld zum Heizen gebraucht'},
      {id: 13, monthYear: {year: 2018, month: 11}, value: -5, repeated: true, note: 'Bananen'},
    ],
    value: ''
  };

  add = (stuff) => {
    console.log('add', stuff);
    stuff.id = this.state.stash.length + 1;
    this.setState(({stash}) => ({
      stash: [
        ...stash,
        stuff
      ]
    }))
  };

  delete = (id) => {
    console.log('delete item with', id);
    this.setState(({item}) => ({
      stash: this.state.stash.filter(stuff => stuff.id !== id)
    }))
  };

  render() {
    const {stash} = this.state;
    return (
        <div>
          <MonthsLegend/>
          <Stash stash={stash} addMethod={this.add} deleteMethod={this.delete}/>
        </div>
    )
  }

}