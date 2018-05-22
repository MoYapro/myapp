import React from 'react'
import List from "material-ui/es/List/List";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";
import {Add} from './add'
import ListItemSecondaryAction from "material-ui/es/List/ListItemSecondaryAction";
import IconButton from "material-ui/es/IconButton/IconButton";
import {Stash as Stuff} from "./stash";
import Typography from "material-ui/es/Typography/Typography";

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export class MonthDetails extends React.Component {

  handleDelete = id => () => {
    this.props.deleteMethod(id);
  };

  render() {
    if (!this.props.monthYear || !this.props.stash) {
      return '';
    }

    let currentMonth = Add.asMonthYearObject(this.props.monthYear);
    let renderedItems = this.props.stash
    .filter(item => Stuff.isBeforeMonthYear(item, currentMonth))
    .map(item => Stuff.moveToCurrentMonth(item, currentMonth))
    .sort((item1, item2) => item1.monthYear.day - item2.monthYear.day);
    return (
        <div>
          <Typography variant="title" gutterBottom>{months[currentMonth.month]}</Typography>
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
          <Add forMonthYear={this.props.monthYear} addMethod={this.props.addMethod}/>
        </div>
    )
  }
}