import React from 'react'
import List from "material-ui/es/List/List";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";

export class MonthDetails extends React.Component {

  render() {
    if (!this.props.monthYear || !this.props.stash) {
      return '';
    }

    console.log('render month details for: ', this.props.monthYear);
    let renderedItems = this.props.stash.filter(stuff => this.props.monthYear === stuff.monthYear.year + '-' + stuff.monthYear.month);
    console.log(renderedItems);
    return (
        <List>
          {renderedItems.map((data) => {
                return (
                    <ListItem key={data.monthYear}>
                      <ListItemText primary={data.value}/>
                    </ListItem>
                )
              }
          )}
        </List>
    )
  }
}