import React from 'react'
import {Paper} from 'material-ui'
import Typography from "material-ui/es/Typography/Typography";
import {Constants} from "../Constants";
import FormControlLabel from "material-ui/es/Form/FormControlLabel";
import Switch from "material-ui/es/Switch/Switch";

export class Settings extends React.Component {

  handleRepeatChange = (event) => {
    this.props.updateSettings({repeatedColapsed:event.target.checked});
  };


  render() {
    return (
    <Paper style={Constants.paperStyle}>
      <Typography variant="title" gutterBottom>Einstellungen</Typography>
      <FormControlLabel
          label="Wiederholte Einträge in Monatsansicht zusammenfassen"
          control={
            <Switch color={'primary'}
                    checked={this.props.settings.repeatedColapsed}
                    onChange={this.handleRepeatChange}
                    value='repeated'
            />
          }
      />
    </Paper>
    )
  }
}