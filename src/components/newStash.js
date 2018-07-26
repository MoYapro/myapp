import React from 'react'
import {Paper} from 'material-ui'
import Button from "material-ui/es/Button/Button";

const containerStyle = {
  display: 'inline-block'
};

const paperStyle = {
  height: 406,
  width: 200,
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