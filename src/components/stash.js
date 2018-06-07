import React from 'react'
import {Paper} from 'material-ui'
import List, {ListItem, ListItemText} from 'material-ui/List'
import {Fn} from "../Fn";
import Button from "material-ui/es/Button/Button";
import {MonthDetails} from "./monthDetails";
import {Constants} from "../Constants";
import Typography from "material-ui/es/Typography/Typography";

const containerStyle = {
  height: 406,
  display: 'inline-block',
};

export class Stash extends React.Component {

  state = {
    colapsed: false,
  };

  handleMonthClick = (monthYear) => () => {
    this.props.updateSelectedMonth(monthYear, this.props.stash.name);
  };

  changeColapsed = () => {
    this.setState({colapsed: !this.state.colapsed});
  };

  render() {
    return (
        <div style={containerStyle}>
          <Paper style={Constants.paperStyle}>
            <Typography variant="title" gutterBottom>{this.props.stash.name}</Typography>
            <Button onClick={this.changeColapsed} color='primary' variant='raised' size={'small'}>{this.state.colapsed ? '±' : '+|-'}</Button>
            <List>
              {Constants.months.map((monthName, monthIndex) => {
                    let key = this.props.selectedYear + '-' + monthIndex;
                    let currentMonthYear = {year: this.props.selectedYear, month: monthIndex};
                let items = this.props.stash.items;
                let monthData = Fn.getGroupedItemsForMonth(items, currentMonthYear, this.state.colapsed);
                    if (this.state.colapsed) {
                      let displayValue = Fn.calculateDisplayValue(monthData);
                      return (
                          <ListItem key={key} button onClick={this.handleMonthClick(monthIndex)} style={{backgroundColor: monthIndex === this.props.selectedMonth ? 'lightskyblue' : ''}}>
                            <ListItemText primary={displayValue}/>
                          </ListItem>
                      );
                    }
                    else if (!this.state.colapsed) {
                      let positiveValue = Fn.calculateDisplayValue(monthData.filter(monthData => monthData.monthYear.includes('positive')));
                      let negativeValue = Fn.calculateDisplayValue(monthData.filter(monthData => monthData.monthYear.includes('negative')));
                      return (
                          <ListItem key={key} button onClick={this.handleMonthClick(monthIndex)} style={{backgroundColor: monthIndex === this.props.selectedMonth ? 'lightskyblue' : ''}}>
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
            <MonthDetails monthYear={{year: this.props.selectedYear, month: this.props.selectedMonth}}
                          settings={this.props.settings}
                          items={this.props.stash.items}
                          stashId={this.props.stash.id}
                          addMethod={this.props.addMethod}
                          deleteMethod={this.props.deleteMethod}/>
          </Paper>
        </div>
    );
  }
}