import React from 'react'
import {Button, TextField} from 'material-ui'

export class Add extends React.Component {

  state = {
    value: '',
    note: '',
    valueError: false,
    noteError: false,
  };

  handleAmountChange = (event) => {
    this.setState({value: event.target.value})
  };

  handleNoteChange = (event) => {
    this.setState({note: event.target.value})
  };

  handleButton = e => {
    e.preventDefault();
    this.resetErrorState();
    if (Add.isEmpty(this.state.value)) {
      this.setState({valueError: true});
    }
    if(Add.isEmpty(this.state.note)) {
      this.setState({noteError: true});
    }

    if(Add.isEmpty(this.state.note) || Add.isEmpty(this.state.note)) {
      return;
    }

    let stuff = {
      'monthYear': Add.asMonthYearObject(this.props.forMonthYear),
      'value': parseFloat(this.state.value),
      'note': this.state.note
    };

    console.log('Add stuff to stash: ', stuff);

    this.props.addMethod(stuff);
    this.setState({value: '', note: ''});
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
          <TextField error={this.state.valueError} label='Wert' name='amount' value={this.state.value} onChange={this.handleAmountChange} margin='normal'/>
          <br/>
          <TextField error={this.state.noteError} label='Grund' name='note' value={this.state.note} onChange={this.handleNoteChange} margin='normal'/>
          <br/>
          <Button type='submit' color='primary' variant='raised'>Eintragen</Button>
        </form>
    )
  }

  resetErrorState() {
    this.setState({valueError: false, noteError: false});
  }

  static isEmpty(value) {
    return !value || '' === value;
  }
}