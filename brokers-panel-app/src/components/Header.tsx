import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { Box, Heading, Flex } from "@oneloop/jopijs";

import { Tabs } from "@oneloop/jopijs";

const Header: React.FC = () => {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Heading
        as="h1"
        variant="heading.0"
        sx={{
          p: "30px 0 30px 0",
          alignSelf: "center"
        }}
      >
        Props & Brokers Panel
      </Heading>
      <Tabs bg="primary" color="neutral.0" sx={{ justifyContent: "center" }}>
        <Tabs.Tab id="properties">
          <Link to="/properties_list">
            <Box as="a" href="#">
              All Properties{" "}
            </Box>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab id="brokers">
          <Link to="/brokers_list">
            <Box as="a" href="#">
              {" "}
              All Brokers{" "}
            </Box>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab id="add-broker">
          <Link to="/add_broker">
            <Box as="a" href="#">
              {" "}
              Add Broker{" "}
            </Box>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab id="add-prop">
          <Link to="/add_property">
            <Box as="a" href="#">
              {" "}
              Add Property{" "}
            </Box>
          </Link>
        </Tabs.Tab>
      </Tabs>
    </Flex>
  );
};

export default withRouter(Header);
