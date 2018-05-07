import React, {Component} from 'react'
import {Button, Paper, TextField, Typography} from 'material-ui'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'

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

  handleChange = ({target: {name, value}}) =>
      this.setState({
        [name]: value
      });

  handleButton = e => {
    e.preventDefault();
    if (this.state.value) {
      this.setState(({stash}) => ({
        stash: [
          ...stash,
          {monthYear: {month: 4, value: 300}, value: 666}
        ],
        value: ''
      }))
    }
  };

  render() {
    const {title, stash} = this.state;
    return (
        <div>
          <Paper>
            <Typography variant='display1' align='center' gutterBottom>Hab ich noch Geld?</Typography>
            <form onSubmit={this.handleButton}>
              <TextField name='title' label='ignore me' value={title} onChange={this.handleChange} margin='normal' />
              <Button type='submit' color='primary' variant='raised'>
                Create
              </Button>
            </form>
          </Paper>
          <MonthsLegend/>
          <Stash stash={stash}/>
          <Stash stash={stash}/>
        </div>
    )
  }

}