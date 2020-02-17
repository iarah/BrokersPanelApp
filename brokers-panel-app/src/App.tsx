import React from 'react';
import {Title} from './components/Title';
import {PropertiesList} from './components/properties-list';
import { BrokersList } from './components/brokers-list';


import './App.css';

function App() {
  return (
    <div className="App">
      <Title></Title>
      <PropertiesList />
      <BrokersList />
      
    </div>
  );
}

export default App;
