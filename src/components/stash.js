import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import _ from 'lodash'
import {MonthDetails} from './monthDetails'
import Button from "material-ui/es/Button/Button";

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'top'
};

const containerStyle = {
  height: 406,
  display: 'inline-block',
};

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export class Stash extends React.Component {

  state = {
    colapsed: false,
    detailsForMonth: undefined,
    year: 2018
  };

  handleMonthClick = (monthYear) => () => {
    this.setState({detailsForMonth: monthYear});
  };

  buildEmptyListItem = (monthYear) => {
    return (
        <ListItem key={monthYear} button onClick={this.handleMonthClick(monthYear)} style={{backgroundColor: monthYear === this.state.detailsForMonth ? 'lightskyblue' : ''}}>
          <ListItemText primary='---'/>
        </ListItem>
    )
  };

  changeColapsed = () => {
    this.setState({colapsed: !this.state.colapsed});
  };

  static calculateDisplayValue(monthData) {
    if (monthData === undefined || monthData.constructor !== Array || monthData[0] === undefined) {
      return '--';
    }
    else if (!monthData[0].value) {
      return '0';
    }
    return monthData[0].value;
  }

  static isBeforeMonthYear(item, monthYear) {
    return item.monthYear.year <= monthYear.year
        && item.monthYear.month <= monthYear.month
        && item.repeated === true
        || item.monthYear.year === monthYear.year
        && item.monthYear.month === monthYear.month;
  }

  monthGrouping = item => {
    let x = this.state.colapsed ? '' : (item.value >= 0 ? '-positive' : '-negative');
    return item.monthYear.year + '-' + item.monthYear.month + (x)
  };

  static mapToSum = (items, key) => ({'monthYear': key, 'value': _.sumBy(items, 'value')});

  static moveToCurrentMonth(item, monthYear) {
    let fromThisMonth = item.monthYear.year === monthYear.year && item.monthYear.month === monthYear.month;
    return {
      id: item.id,
      monthYear: {year: monthYear.year, month: monthYear.month, day: item.monthYear.day},
      value: item.value,
      note: item.note,
      repeated: item.repeated,
      fromThisMonth: fromThisMonth
    }
  }

  render() {
    return (
        <div style={containerStyle}>
          <Paper style={paperStyle}>
            <Button onClick={this.changeColapsed} color='primary' variant='raised'>{this.state.colapsed ? '±' : '+|-'}</Button>
            <List>
              {months.map((monthName, monthIndex) => {
                    let key = this.state.year + '-' + monthIndex;
                    let currentMonthYear = {year: this.state.year, month: monthIndex};
                    let monthData = _(this.props.stash
                    .filter(item => Stash.isBeforeMonthYear(item, currentMonthYear)))
                    .map(item => Stash.moveToCurrentMonth(item, currentMonthYear))
                    .groupBy(this.monthGrouping)
                    .map(Stash.mapToSum).value();
                    if (this.state.colapsed) {
                      let displayValue = Stash.calculateDisplayValue(monthData);
                      return (
                          <ListItem key={key} button onClick={this.handleMonthClick(key)} style={{backgroundColor: key === this.state.detailsForMonth ? 'lightskyblue' : ''}}>
                            <ListItemText primary={displayValue}/>
                          </ListItem>
                      );
                    }
                    else if (!this.state.colapsed) {
                      let positiveValue = Stash.calculateDisplayValue(monthData.filter(monthData => monthData.monthYear.includes('positive')));
                      let negativeValue = Stash.calculateDisplayValue(monthData.filter(monthData => monthData.monthYear.includes('negative')));
                      return (
                          <ListItem key={key} button onClick={this.handleMonthClick(key)} style={{backgroundColor: key === this.state.detailsForMonth ? 'lightskyblue' : ''}}>
                            <ListItemText primary={positiveValue} style={{width: 50}}/>
                            <ListItemText primary={negativeValue} style={{width: 50}}/>
                          </ListItem>
                      );
                    }
                    return '';
                  }
              )}
            </List>
          </Paper>
          <Paper style={paperStyle}>
            <MonthDetails monthYear={this.state.detailsForMonth} stash={this.props.stash} addMethod={this.props.addMethod} deleteMethod={this.props.deleteMethod}/>
          </Paper>
        </div>
    );
  }

}