import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/react-hooks";

import { Collapsible, Box } from "@oneloop/jopijs";

import client from "../utils/client";

const GET_BROKERS = gql`
  query {
    brokers {
      id
      name
      address
    }
  }
`;

export const BrokersList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_BROKERS);
  const [openId, setOpen] = React.useState(-1);

  return (
    <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
      <ApolloProvider client={client}>
        {data?.brokers.map((broker: any, index: any) => (
          <Collapsible width={1 / 3} isOpen={index === openId}>
            <Collapsible.Button
              onClick={() => setOpen(index)}
              variant="default"
              borderBottom="1px solid #e7e7e6"
              key={index}
            >
              {broker.name}
            </Collapsible.Button>
            <Collapsible.Body>
              ID: {broker.id}
              <br />
              ADDRESS: {broker.address}
            </Collapsible.Body>
          </Collapsible>
        ))}
      </ApolloProvider>
    </Box>
  );
};
