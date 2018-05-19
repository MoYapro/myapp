import React from 'react'
import {Button, Paper, Select, TextField} from 'material-ui'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export class Add extends React.Component {

  state = {
    year: 2018,
    month: 0,
    value: ''
  };

  handleAmountChange = (event) => {
    this.setState({value: event.target.value})
  };

  handleMonthChange = (event) => {
    this.setState({month: event.target.value})
  };

  handleButton = e => {
    e.preventDefault();
    let stuff = {
      'monthYear': {year: this.state.year, month: this.state.month},
      'value': parseFloat(this.state.value)
    };

    console.log('Add stuff to stash: ', stuff);

    this.props.addMethod(stuff);
    this.setState({value: ''});
  };

  render() {
    return (
        <Paper style={paperStyle}>
          <form onSubmit={this.handleButton}>
            <Select
                native
                value={this.state.month}
                onChange={this.handleMonthChange}
            >
            {months.map((month, index) => <option key={index} value={index} label={month}/>)}
            </Select>

            <TextField name='amount' value={this.state.value}
                       onChange={this.handleAmountChange} margin='normal'/>
            <Button type='submit' color='primary' variant='raised'>
              Create
            </Button>
          </form>
        </Paper>
    )
  }
}