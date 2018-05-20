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
    colapsed: true,
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
  buildEmptyListItemDouble = (monthYear) => {
    return (
        <ListItem key={monthYear} button onClick={this.handleMonthClick(monthYear)}>
          <ListItemText primary='---'/>
          <ListItemText primary='---'/>
        </ListItem>
    )
  };

  changeColapsed = () => {
    this.setState({colapsed: !this.state.colapsed});
  };

  render() {
    if (this.state.colapsed) {
      return this.renderColapsed();
    } else {
      return this.renderExpanded();
    }
  }

  renderColapsed() {
    let detailStyle = this.getDetailStyle();
    let grouped = this.getGroupedData(this.props.stash);
    return (
        <div style={containerStyle}>
          <Paper style={paperStyle}>
            <Button onClick={this.changeColapsed} color='primary' variant='raised'>{this.state.colapsed ? '±' : '+|-'}</Button>
            <List>
              {months.map((monthName, monthIndex) => {
                    let key = this.state.year + '-' + monthIndex;
                    let monthData = grouped.filter(item => item.monthYear === key);
                    if (monthData.length !== 1) {
                      return this.buildEmptyListItem(key);
                    }
                    return (
                        <ListItem key={monthData[0].monthYear} button onClick={this.handleMonthClick(monthData[0].monthYear)}>
                          <ListItemText primary={monthData[0].value ? monthData[0].value : '0'}/>
                        </ListItem>
                    );
                  }
              )}
            </List>
          </Paper>
          <Paper style={detailStyle}>
            <MonthDetails monthYear={this.state.detailsForMonth} stash={this.props.stash} addMethod={this.props.addMethod} deleteMethod={this.props.deleteMethod}/>
          </Paper>
        </div>
    )
  }

  renderExpanded() {
    let detailStyle = this.getDetailStyle();
    let grouped = this.getExpandedData(this.props.stash);
    console.log(grouped);
    return (
        <div style={containerStyle}>
          <Paper style={paperStyle}>
            <Button onClick={this.changeColapsed} color='primary' variant='raised'>
              {this.state.colapsed ? '±' : '+|-'}
            </Button>
            <List>
              {months.map((month, index) => {
                    let key = this.state.year + '-' + index;
                    let data = [];
                    data[0] = grouped.filter(item => item.monthYear === key + '-positive' )[0];
                    data[1] = grouped.filter(item => item.monthYear === key + '-negative')[0];
                    console.log('data', data);
                    return (
                        <ListItem key={key} button onClick={this.handleMonthClick(key)}>
                          <ListItemText primary={data[0] && data[0].value ? data[0].value : '0'} style={{width: 50}}/>
                          <ListItemText primary={data[1] && data[1].value ? data[1].value : '0'}/>
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

  getDetailStyle() {
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      marginTop: !this.state.detailsForMonth ? 20 : paperStyle.margin + monthHeight * this.state.detailsForMonth.split('-')[1]
    };
  }

  getGroupedData(stash) {
    return _(stash)
    .groupBy(stash => stash.monthYear.year + '-' + stash.monthYear.month)
    .map((items, key) => ({
      'monthYear': key,
      'value': _.sumBy(items, 'value')
    })).value();
  }

  getExpandedData(stash) {
    return _(stash)
    .groupBy(item => item.monthYear.year + '-' + item.monthYear.month + '-' + (item.value >= 0 ? 'positive' : 'negative'))
    .map((items, key) => ({
      'monthYear': key,
      'value': _.sumBy(items, 'value')
    })).value();
  }
}