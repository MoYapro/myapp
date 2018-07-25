import React, {Component} from 'react'
import {MonthsLegend} from './components/monthLegend'
import {Stash} from './components/stash'
import {Settings} from "./components/settings";
import {Constants} from "./Constants";
import {Button, TextField} from "material-ui";

const url = 'http://localhost:8080';

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

  login = (userName) => {
    this.setState(() => ({user: userName}));
    let that = this;
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('loaded data', data);
      if(Array.isArray(data) && 0 < data.length) {
        data = data[0]
      }
      that.setState(data);
    });
  };

  add = (stuff, stashId) => {
    console.log("add stuff to stashId: " + stashId);
    stuff.id = this.state.stashes.length + 1;
    let newStashes = this.state.stashes;
    newStashes.filter(stash => stash.id === stashId)[0].items.push(stuff);
    this.setState(() => ({
      stashes: newStashes
    }))
  };

  delete = (stuffId, stashId) => {
    let newStashes = this.state.stashes;
    console.log('delete', newStashes.filter(stash => stash.id === stashId)[0]);
    newStashes.filter(stash => stash.id === stashId)[0].items = newStashes.filter(stash => stash.id === stashId)[0].items.filter(stuff => stuff.id !== stuffId);
    this.setState(() => ({
      stashes: newStashes
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
    this.setState(() => ({
      selectedMonth: month,
      selectedStash: stashName
    }));
  };

  logout = () => {
    this.setState({user: undefined, stashes: []});
  };

  showUserData = () => {
    return (
        <div>
          <div key='content' style={{width: 5000}} onKeyUp={this.handleKeyPress}>
            <MonthsLegend year={this.state.selectedYear}/>
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
          </div>
          <Settings updateSettings={this.updateSettings} settings={this.state.settings}/>
          <br />
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
                value={this.state.user}
                name='user'
                margin='normal'
                autoComplete='off'
                error={this.state.noteError}
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