import React, { Component } from 'react';
import * as Blueprint from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import * as axios from 'axios'
import '@blueprintjs/datetime/dist/blueprint-datetime.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      aamcid: null,
      password: null,
      date: new Date(),
      data: null,
      view: {}
    }
  };

  componentDidMount() {

  }
  runHandlers(event){
    event.preventDefault();
    axios.post('/handlers', {
      aamcid: this.state.aamcid,
      password: this.state.password,
      date: this.state.date
    })
      .then((response) => {
        this.setState({
          data: response
        })
      })
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'aamcid':
        this.setState({aamcid:event.target.value})
        break;
      case 'password':
        this.setState({password:event.target.value})
        break;   
      case 'email':
        this.setState({email:event.target.value})
    }
  }
  handleDate(event) {
    this.setState({date:event.toISOString()})
  }

  render() {
    let dateprops ={
      name:'date'
    }

    let results = function DataComponent(props) {
        <div className="pt-card pt-elevation-2 card-modifier">
        </div>
    }

    return (
      <section>
      <div className="pt-navbar navbar-modifier">
        <div className="pt-navbar-group pt-align-left navbar-heading-modifier">
          <div className="pt-navbar-heading">Map Aggregator</div>
        </div>
      </div>
      <div className="pt-card pt-elevation-2 card-modifier">
        <form onSubmit={this.runHandlers.bind(this)}>
          <div className="input-wrapper">
          <input className="pt-input input-modifier" name="aamcid" type="text" placeholder="AAMC ID" onChange={this.handleChange.bind(this)}/>
          <input className="pt-input input-modifier" name="email" type="text" placeholder="Email" onChange={this.handleChange.bind(this)}/>
          <input className="pt-input input-modifier" name="password" type="password" placeholder="Password" onChange={this.handleChange.bind(this)}/>
          <DateInput format="MM/DD/YYYY" value={this.state.date} inputProps={dateprops} onChange={this.handleDate.bind(this)}/>
          <button className="pt-button pt-intent-success button-modifier" type="submit">Login</button>
          </div>
        </form>
      </div>
      </section>
    );
  }
}

export default App;
