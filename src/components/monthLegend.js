import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Typography from "material-ui/es/Typography/Typography";
import {Constants} from "../Constants";

export class MonthsLegend extends React.Component {


  render() {
  let listStyle = {
    marginTop: 40
  };
    if(this.props.hidden) return ('');
    return (
    <Paper style={Constants.paperStyle}>
      <Typography variant="title" gutterBottom>{this.props.year}</Typography>
      <List style={listStyle}>
        {Constants.months.map((i) =>
            <ListItem key={i}>
              <ListItemText primary={i}/>
            </ListItem>
        )}
      </List>
    </Paper>
    )
  }
}