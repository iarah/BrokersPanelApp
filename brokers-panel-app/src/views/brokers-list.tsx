import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Collapsible, Box } from "@oneloop/jopijs";

import { GET_BROKERS } from "../graphql/queries";

export const BrokersList: React.FC = () => {
  const { data } = useQuery(GET_BROKERS);
  const [openId, setOpen] = React.useState(-1);

  return (
    <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
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
            <br />
            ADDRESS: {broker.address}
            <br />
          </Collapsible.Body>
        </Collapsible>
      ))}
    </Box>
  );
};
