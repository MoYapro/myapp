import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Typography from "material-ui/es/Typography/Typography";

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'top'
};


export class MonthsLegend extends React.Component {
  render() {
 const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    return (
    <Paper style={paperStyle}>
      <Typography variant="title" gutterBottom>{this.props.year}</Typography>
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