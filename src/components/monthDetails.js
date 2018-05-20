import React from 'react'
import List from "material-ui/es/List/List";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";
import {Add} from './add'
import ListItemSecondaryAction from "material-ui/es/List/ListItemSecondaryAction";
import IconButton from "material-ui/es/IconButton/IconButton";

export class MonthDetails extends React.Component {

  handleDelete = id => () => {
    this.props.deleteMethod(id);
  };

  render() {
    if (!this.props.monthYear || !this.props.stash) {
      return '';
    }

    console.log('render month details for: ', this.props.monthYear);
    let renderedItems = this.props.stash.filter(stuff => this.props.monthYear === stuff.monthYear.year + '-' + stuff.monthYear.month);
    return (
        <div>
          <List>
            {renderedItems.map((data, i) => {
                  return (
                      <ListItem key={i}>
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