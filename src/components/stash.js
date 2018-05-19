import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import _ from 'lodash'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export class Stash extends React.Component {
  render() {
    let stash = this.props.stash;
    let grouped = _(stash)
    .groupBy(stash => stash.monthYear.year + '-' + stash.monthYear.month)
    .map((items, key) => ({
      'monthYear': key,
      'value': _.sumBy(items, 'value')
    }))
    .value();
    console.log(grouped);
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