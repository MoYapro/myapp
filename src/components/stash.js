import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


export class Stash extends React.Component {
  render() {
    return (
        <Paper style={paperStyle}>
          <List>
            {this.props.stash.map(({monthYear, value}) =>
                <ListItem key={monthYear}>
                  <ListItemText primary={value}/>
                </ListItem>
            )}
          </List>
        </Paper>

    )
  }
}