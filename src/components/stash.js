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

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export class Stash extends React.Component {

  state = {
    detailsForMonth: undefined,
    year: 2018
  };

  handleMonthClick = (monthYear) => () => {
    console.log('select:', monthYear);
    this.setState({detailsForMonth: monthYear});
  };

  buildEmptyListItem = (monthYear) => {
    return (
        <ListItem key={monthYear} button onClick={this.handleMonthClick(monthYear)}>
          <ListItemText primary='---'/>
        </ListItem>
    )
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
    console.log(grouped);
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
              {months.map((month, index) => {
                    let key = this.state.year + '-' + index;
                    let data = grouped.filter(item => item.monthYear === key);
                    console.log('data', data.length);
                    if (data.length !== 1) {
                      return this.buildEmptyListItem(key);
                    }
                    data = data[0];
                    let displayValue = data.value ? data.value : '0';
                    return (
                        <ListItem key={data.monthYear} button onClick={this.handleMonthClick(data.monthYear)}>
                          <ListItemText primary={displayValue}/>
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