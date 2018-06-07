import React from 'react'
import {Button, TextField} from 'material-ui'
import Switch from "material-ui/es/Switch/Switch";
import FormControlLabel from "material-ui/es/Form/FormControlLabel";

export class Add extends React.Component {

  state = {
    value: '',
    note: '',
    valueError: false,
    noteError: false,
    repeated: true
  };

  handleAmountChange = (event) => {
    this.setState({value: event.target.value})
  };

  handleNoteChange = (event) => {
    this.setState({note: event.target.value})
  };

  handleRepeatChange = (event) => {
    this.setState({repeated: event.target.checked});
  };

  handleButton = e => {
    e.preventDefault();
    this.resetErrorState();
    if (Add.isEmpty(this.state.value)) {
      this.setState({valueError: true});
    }
    if (Add.isEmpty(this.state.note)) {
      this.setState({noteError: true});
    }

    if (Add.isEmpty(this.state.note) || Add.isEmpty(this.state.note)) {
      return;
    }
    let stuff = {
      'monthYear': this.props.forMonthYear,
      'value': parseFloat(this.state.value),
      'note': this.state.note,
      'repeated': this.state.repeated
    };
    stuff.monthYear.day = 1;
    this.props.addMethod(stuff, this.props.forStashId);
    this.setState({value: '', note: ''});
  };

  static asMonthYearObject(monthYearString) {
    return {
      year: parseInt(monthYearString.split('-')[0], 10),
      month: parseInt(monthYearString.split('-')[1], 10)
    }
  }

  render() {
    return (
        <form onSubmit={this.handleButton} style={{textAlign: 'center'}}>
          <FormControlLabel
              label="Wiederholt"
              control={
                <Switch color={'primary'}
                        checked={this.state.repeated}
                        onChange={this.handleRepeatChange}
                        value='repeated'
                />
              }
          />
          <br/>
          <TextField
              label='Wert'
              value={this.state.value}
              name='amount'
              margin='normal'
              autoComplete='off'
              onChange={this.handleAmountChange}
              error={this.state.valueError}
          />
          <br/>
          <TextField
              label='Grund'
              value={this.state.note}
              name='note'
              margin='normal'
              autoComplete='off'
              onChange={this.handleNoteChange}
              error={this.state.noteError}
          />
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