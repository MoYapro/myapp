import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import _ from 'lodash'
import {MonthDetails} from './monthDetails'

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const monthHeight = 49;

const containerStyle = {
  height: 406,
  display: 'inline-block',
};

export class Stash extends React.Component {

  state = {
    detailsForMonth: undefined
  };

  handleMonthClick = (monthYear) => () => {
    console.log('select:', monthYear);
    this.setState({detailsForMonth: monthYear});
  };

  render() {
    let stash = this.props.stash;
    let grouped = _(stash)
    .groupBy(stash => stash.monthYear.year + '-' + stash.monthYear.month)
    .map((items, key) => ({
      'monthYear': key,
      'value': _.sumBy(items, 'value')
    }))
    .value();
    let detailStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      marginTop: !this.state.detailsForMonth ? 20 : paperStyle.margin + monthHeight * this.state.detailsForMonth.split('-')[1]
  }
    ;
    return (
        <div style={containerStyle}>
          <Paper style={paperStyle}>
            <List>
              {grouped.map((data) => {
                    return (
                        <ListItem key={data.monthYear} button onClick={this.handleMonthClick(data.monthYear)}>
                          <ListItemText primary={data.value}/>
                        </ListItem>
                    )
                  }
              )}
            </List>
          </Paper>
          <Paper style={detailStyle}>
            <MonthDetails monthYear={this.state.detailsForMonth} stash={this.props.stash} addMethod={this.props.addMethod}/>
          </Paper>
        </div>
    )
  }
}