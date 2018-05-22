import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import _ from 'lodash'
import {Fn} from "../Fn";
import Button from "material-ui/es/Button/Button";
import {MonthDetails} from "./monthDetails";
import {Constants} from "../Constants";

const containerStyle = {
  height: 406,
  display: 'inline-block',
};

export class Stash extends React.Component {

  state = {
    colapsed: false,
    detailsForMonth: undefined,
    year: 2018
  };

  handleMonthClick = (monthYear) => () => {
    this.setState({detailsForMonth: monthYear});
  };

  changeColapsed = () => {
    this.setState({colapsed: !this.state.colapsed});
  };

  monthGrouping = item => {
    let x = this.state.colapsed ? '' : (item.value >= 0 ? '-positive' : '-negative');
    return item.monthYear.year + '-' + item.monthYear.month + (x)
  };

  render() {
    return (
        <div style={containerStyle}>
          <Paper style={Constants.paperStyle}>
            <Button onClick={this.changeColapsed} color='primary' variant='raised' size={'small'}>{this.state.colapsed ? '±' : '+|-'}</Button>
            <List>
              {Constants.months.map((monthName, monthIndex) => {
                    let key = this.state.year + '-' + monthIndex;
                    let currentMonthYear = {year: this.state.year, month: monthIndex};
                    let monthData = _(this.props.stash
                    .filter(item => Fn.isBeforeMonthYear(item, currentMonthYear)))
                    .map(item => Fn.moveToCurrentMonth(item, currentMonthYear))
                    .groupBy(this.monthGrouping)
                    .map(Fn.mapToSum).value();
                    if (this.state.colapsed) {
                      let displayValue = Fn.calculateDisplayValue(monthData);
                      return (
                          <ListItem key={key} button onClick={this.handleMonthClick(key)} style={{backgroundColor: key === this.state.detailsForMonth ? 'lightskyblue' : ''}}>
                            <ListItemText primary={displayValue}/>
                          </ListItem>
                      );
                    }
                    else if (!this.state.colapsed) {
                      let positiveValue = Fn.calculateDisplayValue(monthData.filter(monthData => monthData.monthYear.includes('positive')));
                      let negativeValue = Fn.calculateDisplayValue(monthData.filter(monthData => monthData.monthYear.includes('negative')));
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
          <Paper style={Constants.paperStyle}>
            <MonthDetails monthYear={this.state.detailsForMonth} stash={this.props.stash} addMethod={this.props.addMethod} deleteMethod={this.props.deleteMethod}/>
          </Paper>
        </div>
    );
  }
}