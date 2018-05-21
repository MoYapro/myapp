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
};

const monthHeight = 49;

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
    console.log('select:', monthYear);
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

  render() {
    let detailStyle = this.getDetailStyle();
    return (
        <div style={containerStyle}>
          <Paper style={paperStyle}>
            <Button onClick={this.changeColapsed} color='primary' variant='raised'>{this.state.colapsed ? '±' : '+|-'}</Button>
            <List>
              {months.map((monthName, monthIndex) => {
                    let key = this.state.year + '-' + monthIndex;
                    let monthData = _(this.props.stash
                    .filter(item => Stash.isSameMonthYear(item, {year: this.state.year, month: monthIndex})))
                    .groupBy(this.monthGrouping)
                    .map(Stash.mapToSum).value();
                    if (monthData.length === 0) {
                      return this.buildEmptyListItem(key);
                    }
                    else if (monthData.length === 1) {
                      return (
                          <ListItem key={key} button onClick={this.handleMonthClick(key)} style={{backgroundColor: key === this.state.detailsForMonth ? 'lightskyblue' : ''}}>
                            <ListItemText primary={monthData[0].value ? monthData[0].value : '0'}/>
                          </ListItem>
                      );
                    }
                    else if (monthData.length === 2) {
                      let positiveValue = 0;
                      let negativeValue = 0;
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
          <Paper style={detailStyle}>
            <MonthDetails monthYear={this.state.detailsForMonth} stash={this.props.stash} addMethod={this.props.addMethod} deleteMethod={this.props.deleteMethod}/>
          </Paper>
        </div>
    );
  }

  static isSameMonthYear(item, monthYear) {
    return item.monthYear.year === monthYear.year
        && item.monthYear.month === monthYear.month;
  }

  monthGrouping = item => item.monthYear.year + '-' + item.monthYear.month + (this.state.colapsed ? '' : (item.value >= 0 ? '-positive' : '-negative'));

  static mapToSum = (items, key) => ({'monthYear': key, 'value': _.sumBy(items, 'value')});

  getDetailStyle() {
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      marginTop: !this.state.detailsForMonth ? 20 : paperStyle.margin + monthHeight * this.state.detailsForMonth.split('-')[1]
    };
  }
}