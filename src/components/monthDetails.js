import React from 'react'
import List from "material-ui/es/List/List";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";
import {Add} from './add'

export class MonthDetails extends React.Component {

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
                        <ListItemText primary={data.note}/>
                        <ListItemText primary={data.value}/>
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