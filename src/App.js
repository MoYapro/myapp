import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'
import {NewStash} from './components/newStash'
import {Settings} from "./components/settings";
import {Constants} from "./Constants";
import {Button, TextField} from "material-ui";
import Typography from "material-ui/es/Typography/Typography";
import {deleteItem, addItem, findStashById, replaceStashInStashes} from './businessLogic/stash-functions';

const backendUrl = 'http://localhost:8080/';
const loadUser = 'loadUser/';
const saveData = 'saveData/';

export default class App extends Component {
  state = {
    stashes: [],
    selectedYear: 2018,
    selectedMonth: undefined,
    selectedStash: undefined,
    settings: {
      repeatedColapsed: true
    },

  };

  login = e => {
    e.preventDefault();
    console.log('get data for user', this.state.enteredUserName);
    this.setState({user: this.state.enteredUserName});
    let that = this;
    fetch(backendUrl + loadUser + this.state.enteredUserName)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('loaded data', data);
      if (!data || !data[0] || !data[0].data) {
        return;
      }
      if(Array.isArray(data) && 0 < data.length) {
        data = data[0];
      }
      if (data.data !== undefined) {
        data = data.data;
      }
      if('string' === typeof data) {
        data = JSON.parse(data);
      }
      console.log('set state to', data);
      that.setState(data);
    });
  };

  save = () => {
    let user = this.state.user;
    let data = this.state;
    let saveUrl = backendUrl + saveData + user;
    console.log('save data to', saveUrl);
    console.log('saved data ',  data);
    fetch(saveUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: JSON.stringify(data)
      })
    })
    .then(postInfo => console.log(postInfo))
    .catch(error => console.log('error while sending data', error));
  };


  add = (item, stashId) => {
    let newStashes = this.state.stashes;
    let newStash = addItem(findStashById(newStashes, stashId), item);
    this.setState(() => ({
      stashes: replaceStashInStashes(newStashes, stashId, newStash)
    }))
  };

  delete = (itemId, stashId) => {
    this.setState(() => ({
      stashes: deleteItem(this.state.stashes, stashId, itemId)
    }))
  };

  updateSettings = (settings) => this.setState(() => ({settings: settings}));

  handleKeyPress = (event) => {
    if (Constants.upArrowCode === event.keyCode) {
      if (this.state.selectedMonth === undefined || this.state.selectedMonth === 0) {
        return;
      }
      this.updateSelectedMonth(this.state.selectedMonth - 1, this.state.selectedStash);
    } else if (Constants.downArrowCode === event.keyCode) {
      if (this.state.selectedMonth === undefined || this.state.selectedMonth === 11) {
        return;
      }
      this.updateSelectedMonth(this.state.selectedMonth + 1, this.state.selectedStash)
    }
  };

  updateSelectedMonth = (month, stashName) => {
    if (month === undefined) {
      return;
    }
    if(this.state.selectedMonth === month && this.state.selectedStash === stashName) {
      this.setState(() => ({
        selectedMonth: null,
        selectedStash: ''
      }));
    } else {
    this.setState(() => ({
      selectedMonth: month,
      selectedStash: stashName
    }));
    }
  };

  updateEnteredUserName = (event) => {
    this.setState({enteredUserName: event.target.value});
  };

  logout = () => {
    this.setState({enteredUserName: 'default_user', user: undefined, stashes: []});
  };

  addStash = () => {
    console.log('add new stash');
    let newStashes = this.state.stashes;
    let nextStashId = newStashes.length+1;
    let newStash = {id: nextStashId,name: 'Konto'+nextStashId, items: []};
    newStashes.push(newStash);
    this.setState({stashes: newStashes});
    this.save();
  };

  showUserData = () => {
    return (
        <div>
          <Typography variant="title" gutterBottom>{this.state.user}</Typography>
          <div key='content' style={{width: 5000}} onKeyUp={this.handleKeyPress}>
            <MonthsLegend year={this.state.selectedYear} hidden={0 === this.state.stashes.length}/>
            {this.state.stashes.map(stash =>
                <Stash key={stash.name}
                       stash={stash}
                       selectedMonth={this.state.selectedStash === stash.name ? this.state.selectedMonth : undefined}
                       selectedYear={this.state.selectedYear}
                       settings={this.state.settings}
                       addMethod={this.add}
                       deleteMethod={this.delete}
                       updateSelectedMonth={this.updateSelectedMonth}
                />
            )}
            <NewStash addAction={this.addStash}/>
          </div>
          <Settings updateSettings={this.updateSettings} settings={this.state.settings}/>
          <br />
          <Button onClick={this.save} color='primary' variant='raised' size={'small'}>Speichern</Button>
          <Button onClick={this.logout} color='secondary' variant='raised' size={'small'}>Ende</Button>
        </div>
    )
  };

  showUserSelect = () => {
    return (
        <div>
          <form onSubmit={this.login} style={{textAlign: 'center'}}>
            <TextField
                label='Dein Name'
                value={this.state.value}
                name='user'
                margin='normal'
                autoComplete='off'
                onChange={this.updateEnteredUserName}
                autoFocus
            />
            <br/>
            <Button type='submit' color='primary' variant='raised'>Eintragen</Button>
          </form>
        </div>
    );
  };

  render() {
    if(this.state.user) {
      return this.showUserData();
    } else {
      return this.showUserSelect();
    }
  }
}