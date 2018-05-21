import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'

export default class App extends Component {
  state = {
    stash: [
      {id: 1, monthYear: {year: 2018, month: 0}, value: 12, repeated: false, note: 'Kino'},
      {id: 100, monthYear: {year: 2018, month: 0}, value: 1200, repeated: true, note: 'Gehalt Tom'},
      {id: 101, monthYear: {year: 2018, month: 0}, value: 600, repeated: true, note: 'Gehalt Anne'},
      {id: 102, monthYear: {year: 2018, month: 0}, value: 200, repeated: true, note: 'Kindergeld'},
      {id: 103, monthYear: {year: 2018, month: 0}, value: -600, repeated: true, note: 'Miete'},
      {id: 103, monthYear: {year: 2018, month: 0}, value: -300, repeated: true, note: 'Strom/Gas'},
      {id: 103, monthYear: {year: 2018, month: 0}, value: -320, repeated: true, note: 'Wocheneinkauf'},
      {id: 103, monthYear: {year: 2018, month: 0}, value: 600, repeated: true, note: 'Miete'},
      {id: 1, monthYear: {year: 2018, month: 0}, value: 12, repeated: false, note: 'Kino'},
      {id: 2, monthYear: {year: 2018, month: 0}, value: 88, repeated: false, note: 'Urlaub'},
      {id: 14, monthYear: {year: 2018, month: 0}, value: -666, repeated: false, note: 'Tierarzt'},
      {id: 3, monthYear: {year: 2018, month: 1}, value: 33, repeated: false, note: 'Urlaub'},
      {id: 4, monthYear: {year: 2018, month: 2}, value: -5, repeated: false, note: 'Klamotten'},
      {id: 5, monthYear: {year: 2018, month: 2}, value: 10, repeated: false, note: 'Reiten'},
      {id: 6, monthYear: {year: 2018, month: 3}, value: -5, repeated: false, note: 'Ausflug'},
      {id: 7, monthYear: {year: 2018, month: 4}, value: 0, repeated: false, note: ''},
      {id: 8, monthYear: {year: 2018, month: 5}, value: -5, repeated: false, note: 'Spielzeug'},
      {id: 9, monthYear: {year: 2018, month: 6}, value: -5, repeated: false, note: 'Eis'},
      {id: 10, monthYear: {year: 2018, month: 8}, value: -5, repeated: false, note: ''},
      {id: 11, monthYear: {year: 2018, month: 9}, value: -5, repeated: false, note: '4711'},
      {id: 12, monthYear: {year: 2018, month: 10}, value: -5, repeated: false, note: 'Hier haben wir einfach mal so Geld zum Heizen gebraucht'},
      {id: 13, monthYear: {year: 2018, month: 11}, value: -5, repeated: false, note: 'Bananen'},
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