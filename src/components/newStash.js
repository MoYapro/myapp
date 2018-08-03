import React from 'react'
import {Paper} from 'material-ui'
import Button from "material-ui/es/Button/Button";
import Typography from "material-ui/es/Typography/Typography";
import {Constants} from "../Constants";
import List from "material-ui/es/List/List";

const containerStyle = {
  display: 'inline-block'
};

const paperStyle = {
  height: 645,
  width: 100,
  textAlign: 'center',
  display: 'inline-block',
  borderStyle: 'dashed',
  margin: 20,
};

const buttonStyle = {
  marginTop: 158
};

export class NewStash extends React.Component {

  render() {
    return (
        <div style={containerStyle}>
          <Paper style={paperStyle}>
            <Typography variant="title">Neues Konto</Typography>
            <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                style={buttonStyle}
                onClick={this.props.addAction}
            >
              +
            </Button>
            </Paper>
        </div>
    );
  }
}