import React from 'react'
import {Button, Paper, TextField} from 'material-ui'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export class Add extends React.Component {

  state = {value: ''};

  handleChange = (event) => {
    this.setState({value: event.target.value})
  };

  handleButton = e => {
    e.preventDefault();
    let stuff = {value: this.state.value}
    this.props.addMethod(stuff);

  };

  render() {
    return (
        <Paper style={paperStyle}>
          <form onSubmit={this.handleButton}>
            <TextField name='xxx' value={this.state.value}
                       onChange={this.handleChange} margin='normal'/>
            <Button type='submit' color='primary' variant='raised'>
              Create
            </Button>
          </form>
        </Paper>
    )
  }
}