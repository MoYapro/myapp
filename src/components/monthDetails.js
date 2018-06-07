import React from 'react'
import List from "material-ui/es/List/List";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";
import {Add} from './add'
import ListItemSecondaryAction from "material-ui/es/List/ListItemSecondaryAction";
import IconButton from "material-ui/es/IconButton/IconButton";
import Typography from "material-ui/es/Typography/Typography";
import {Fn} from "../Fn";
import {Constants} from "../Constants";

export class MonthDetails extends React.Component {

  handleDelete = id => () => {
    this.props.deleteMethod(id);
  };

  render() {
    let currentMonthYear = this.props.monthYear;
    if (!this.props.items || !this.props.monthYear || this.props.monthYear.year === undefined || this.props.monthYear.month === undefined) {
      return '';
    }
    let renderedItems = this.props.settings.repeatedColapsed ? this.getColapsed(currentMonthYear) : Fn.selectItemsForMonth(this.props.items, currentMonthYear);
    return (
        <div>
          <Typography variant="title" gutterBottom>{Constants.months[currentMonthYear.month]}</Typography>
          <List>
            {renderedItems.map((data, i) => {
                  return (
                      <ListItem key={i}>
                        <ListItemText primary={(data.monthYear.day < 10 ? '0' : '') + data.monthYear.day} style={{width: 10, textAlign: 'right'}}/>
                        <ListItemText primary={data.fromThisMonth ? '' : '∞'} style={{width: 10}}/>
                        <ListItemText primary={data.note ? data.note : ''} style={{width: 150}}/>
                        <ListItemText primary={data.value ? data.value : '0'} style={{width: 50, textAlign: 'right'}}/>
                        <ListItemSecondaryAction onClick={this.handleDelete(data.id)}>
                          <IconButton aria-label="Löschen" style={{textAlign: 'center', color: 'red'}}>X</IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                  )
                }
            )}
          </List>
          <Add forMonthYear={this.props.monthYear} forStashId={this.props.stashId} addMethod={this.props.addMethod}/>
        </div>
    )
  }

  getColapsed(currentMonthYear) {
    let sums = Fn.getGroupedItemsForMonth(this.props.items, currentMonthYear, false).map(item => Fn.enrichWithDetails(item, currentMonthYear));
    let detailedItems = Fn.selectItemsForMonth(this.props.items, currentMonthYear).filter(item => Fn.isInMonthYear(item, currentMonthYear)).filter(Fn.isNotRepeated);
    return sums.concat(detailedItems);
  }
}