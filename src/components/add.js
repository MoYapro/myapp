import React from 'react'
import {Button, Paper, TextField} from 'material-ui'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
export class Add extends React.Component {

  state = {
    value: '',
    note: ''
  };

  handleAmountChange = (event) => {
    this.setState({value: event.target.value})
  };

  handleNoteChange = (event) => {
    this.setState({note: event.target.value})
  };

  handleButton = e => {
    e.preventDefault();
    let stuff = {
      'monthYear': Add.asMonthYearObject(this.props.forMonthYear),
      'value': parseFloat(this.state.value),
      'note': this.state.note
    };

    console.log('Add stuff to stash: ', stuff);

    this.props.addMethod(stuff);
    this.setState({value: ''});
  };

  static asMonthYearObject(monthYearString) {
    return {
      year: monthYearString.split('-')[0],
      month: monthYearString.split('-')[1]
    }
  }

  render() {
    return (
          <form onSubmit={this.handleButton} style={{textAlign: 'center'}}>
            <TextField label='Wert' name='amount' value={this.state.value} onChange={this.handleAmountChange} margin='normal'/>
            <br />
            <TextField label='Grund' name='note' value={this.state.note} onChange={this.handleNoteChange} margin='normal'/>
            <br />
            <Button type='submit' color='primary' variant='raised'>Eintragen</Button>
          </form>
    )
  }
}