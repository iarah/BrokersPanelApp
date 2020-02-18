import React from 'react';
import {Title} from './components/Title';
import {PropertiesList} from './components/properties-list';
import { BrokersList } from './components/brokers-list';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import {AddBroker} from './components/add-broker';
import {AddProperty} from './components/add-property';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Title></Title>
      <Switch>
        <Route exact 
                path="/properties_list"
                component={PropertiesList}/>

        <Route exact 
                path="/brokers_list"
                component={BrokersList}/>

        <Route exact 
                path="/add_broker"
                component={AddBroker}/>

        <Route exact 
                path="/add_property"
                component={AddProperty}/>
      </Switch>
    </div>
  );
}

export default App;
