import React from 'react'
import {Button, Paper, TextField} from 'material-ui'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export class Add extends React.Component {

  handleChange = ({target: {name, value}}) =>
      this.setState({
        [name]: value
      });

  handleButton = e => {
    e.preventDefault();
    this.props.stash;
      this.setState(({stash}) => ({
        stash: [
          ...stash,
          {monthYear: {month: 4, value: 300}, value: 666}
        ],
        value: ''
      }))

  };

  render() {
    return (
        <Paper style={paperStyle}>
          <form onSubmit={this.handleButton}>
            <TextField name='title' value=''
                       onChange={this.handleChange} margin='normal'/>
            <Button type='submit' color='primary' variant='raised'>
              Create
            </Button>
          </form>
        </Paper>
    )
  }
}