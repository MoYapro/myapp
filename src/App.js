import React, {Component} from 'react'
import Typography from 'material-ui/Typography'


export default class App extends Component {
  state = {
    exercises: [],
    title: ''
  };

  render() {
    return (
        <Typography variant='display1' align='center' gutterBottom>Home</Typography>

    )
  }
}