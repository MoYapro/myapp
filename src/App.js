import React, {Component} from 'react'
import {Button, Paper, TextField, Typography} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export default class App extends Component {
  state = {
    stash: [
      {monthYear: {month: 0, value: 100}, value: 12},
      {monthYear: {month: 1, value: 200}, value: 33},
      {monthYear: {month: 2, value: 300}, value: -5}
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
      this.setState(({stash, value}) => ({
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
            <Typography variant='display1' align='center'gutterBottom>Hab ich noch Geld?</Typography>
            <form onSubmit={this.handleButton}>
              <TextField name='title' label='ignore me' value={title} onChange={this.handleChange} margin='normal' />
              <Button type='submit' color='primary' variant='raised'>
                Create
              </Button>
            </form>
          </Paper>
          <Paper style={paperStyle}>
            <List>
              {months.map((i) =>
                  <ListItem key={i}>
                    <ListItemText primary={i}/>
                  </ListItem>
              )}
            </List>
          </Paper>
          <Paper style={paperStyle}>
            <List>
              {stash.map(({monthYear, value}) =>
                  <ListItem key={monthYear}>
                    <ListItemText primary={value}/>
                  </ListItem>
              )}
            </List>
          </Paper>
          <Paper style={paperStyle}>
            <List>
              {stash.map(({monthYear, value}) =>
                  <ListItem key={monthYear}>
                    <ListItemText primary={value}/>
                  </ListItem>
              )}
            </List>
          </Paper>
        </div>
    )
  }

}