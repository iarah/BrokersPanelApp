import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Box } from "@oneloop/jopijs";

import Header from "./components/Header";
import { PropertiesList } from "./views/properties-list";
import { BrokersList } from "./views/brokers-list";
import { AddBroker } from "./views/add-broker";
import { AddProperty } from "./views/add-property";

function App() {
  return (
    <Box
      className="App"
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "left"
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/properties_list" component={PropertiesList} />

        <Route exact path="/brokers_list" component={BrokersList} />

        <Route exact path="/add_broker" component={AddBroker} />

        <Route exact path="/add_property" component={AddProperty} />

        <Redirect exact from="/" to="brokers_list" />
      </Switch>
    </Box>
  );
}

export default App;
