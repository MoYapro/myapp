import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


export class MonthsLegend extends React.Component {
  render() {
 const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    return (
    <Paper style={paperStyle}>
      <List>
        {months.map((i) =>
            <ListItem key={i}>
              <ListItemText primary={i}/>
            </ListItem>
        )}
      </List>
    </Paper>
    )
  }
}