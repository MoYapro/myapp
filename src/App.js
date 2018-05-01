import React, {Component} from 'react'
import {Typography, Paper, TextField} from 'material-ui'

export default class App extends Component {
  state = {
    exercises: [],
    title: ''
  };

  handleChange = ({target: {name, value}}) =>
      this.setState({
        [name]: value
      });

  render() {
const { title } = this.state;
    return (
        <Paper>
        <Typography variant='display1' align='center'
                    gutterBottom>Home</Typography>

        <form>
        <TextField name='title' label='Exercise' value={title} onChange={this.handleChange} margin='normal'/>
        </form>
        </Paper>
    )
  }
}