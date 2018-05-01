import React, {Component} from 'react'
import {Button, Paper, TextField, Typography} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'

export default class App extends Component {
  state = {
    exercises: [
      {id: 1, title: 'one'},
      {id: 2, title: 'two'},
      {id: 3, title: 'three'}
    ],
    title: ''
  };

  handleChange = ({target: {name, value}}) =>
      this.setState({
        [name]: value
      });

  handleButton = e => {
    e.preventDefault();
    if (this.state.title) {
      this.setState(({exercises, title}) => ({
        exercises: [
          ...exercises,
          {title, id: Date.now()}
        ],
        title: ''
      }))
    }
  };

  render() {
    const {title, exercises} = this.state;
    return (
        <div>
          <Paper>
            <Typography variant='display1' align='center'
                        gutterBottom>Home</Typography>

            <form onSubmit={this.handleButton}>
              <TextField name='title' label='Exercise' value={title}
                         onChange={this.handleChange} margin='normal'/>
              <Button type='submit' color='primary' variant='raised'>
                Create
              </Button>
            </form>
          </Paper>
          <Paper>
            <List>
              {exercises.map(({id, title}) =>
                  <ListItem key={id}>
                    <ListItemText primary={title}/>
                  </ListItem>
              )}
            </List>
          </Paper>
        </div>
    )
  }

}