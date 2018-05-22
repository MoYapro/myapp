import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
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

  render() {
    return (
        <div style={containerStyle}>
          <Paper style={Constants.paperStyle}>
            <Button onClick={this.changeColapsed} color='primary' variant='raised' size={'small'}>{this.state.colapsed ? '±' : '+|-'}</Button>
            <List>
              {Constants.months.map((monthName, monthIndex) => {
                    let key = this.state.year + '-' + monthIndex;
                    let currentMonthYear = {year: this.state.year, month: monthIndex};
                    let monthData = Fn.getGroupedItemsForMonth(this.props.stash, currentMonthYear, this.state.colapsed);
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
            <MonthDetails monthYear={this.state.detailsForMonth}
                          settings={this.props.settings}
                          stash={this.props.stash}
                          addMethod={this.props.addMethod}
                          deleteMethod={this.props.deleteMethod}/>
          </Paper>
        </div>
    );
  }
}