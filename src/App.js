import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'

export default class App extends Component {
  state = {
    stash: [
      {id: 1, monthYear: {year: 2018, month: 0, day: 1}, value: 12, repeated: false, note: 'Kino'},
      {id: 2, monthYear: {year: 2018, month: 0, day: 1}, value: 1200, repeated: true, note: 'Gehalt Tom'},
      {id: 3, monthYear: {year: 2018, month: 0, day: 1}, value: 600, repeated: true, note: 'Gehalt Anne'},
      {id: 4, monthYear: {year: 2018, month: 0, day: 19}, value: 200, repeated: true, note: 'Kindergeld'},
      {id: 5, monthYear: {year: 2018, month: 0, day: 1}, value: -600, repeated: true, note: 'Miete'},
      {id: 6, monthYear: {year: 2018, month: 0, day: 1}, value: -300, repeated: true, note: 'Strom/Gas'},
      {id: 7, monthYear: {year: 2018, month: 0, day: 1}, value: -320, repeated: true, note: 'Wocheneinkauf'},
      {id: 8, monthYear: {year: 2018, month: 0, day: 1}, value: 600, repeated: true, note: 'Miete'},
      {id: 9, monthYear: {year: 2018, month: 0, day: 1}, value: 12, repeated: false, note: 'Kino'},
      {id: 10, monthYear: {year: 2018, month: 0, day: 1}, value: 88, repeated: false, note: 'Urlaub'},
      {id: 11, monthYear: {year: 2018, month: 0, day: 1}, value: -666, repeated: false, note: 'Tierarzt'},
      {id: 12, monthYear: {year: 2018, month: 1, day: 1}, value: 33, repeated: false, note: 'Urlaub'},
      {id: 13, monthYear: {year: 2018, month: 2, day: 1}, value: -5, repeated: false, note: 'Klamotten'},
      {id: 14, monthYear: {year: 2018, month: 2, day: 1}, value: 10, repeated: false, note: 'Reiten'},
      {id: 15, monthYear: {year: 2018, month: 3, day: 1}, value: -5, repeated: false, note: 'Ausflug'},
      {id: 16, monthYear: {year: 2018, month: 4, day: 1}, value: 0, repeated: false, note: ''},
      {id: 17, monthYear: {year: 2018, month: 5, day: 1}, value: -5, repeated: false, note: 'Spielzeug'},
      {id: 18, monthYear: {year: 2018, month: 6, day: 1}, value: -5, repeated: false, note: 'Eis'},
      {id: 19, monthYear: {year: 2018, month: 8, day: 1}, value: -5, repeated: false, note: ''},
      {id: 20, monthYear: {year: 2018, month: 9, day: 1}, value: -5, repeated: false, note: '4711'},
      {id: 21, monthYear: {year: 2018, month: 10, day: 1}, value: -5, repeated: false, note: 'Hier haben wir einfach mal so Geld zum Heizen gebraucht'},
      {id: 22, monthYear: {year: 2018, month: 11, day: 1}, value: -5, repeated: false, note: 'Bananen'},
    ],
    value: ''
  };

  add = (stuff) => {
    stuff.id = this.state.stash.length + 1;
    this.setState(({stash}) => ({
      stash: [
        ...stash,
        stuff
      ]
    }))
  };

  delete = (id) => {
    this.setState(({item}) => ({
      stash: this.state.stash.filter(stuff => stuff.id !== id)
    }))
  };

  render() {
    const {stash} = this.state;
    return (
        <div style={{width: 5000}}>
          <MonthsLegend/>
          <Stash stash={stash} addMethod={this.add} deleteMethod={this.delete}/>
        </div>
    )
  }

}