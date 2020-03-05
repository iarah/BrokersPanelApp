import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Table, Box } from "@oneloop/jopijs";

import { GET_PROPERTIES } from "../graphql/queries";

export const PropertiesList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PROPERTIES);
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
      <Table>
        <Table.Header>
          <Table.HeaderItem>ID</Table.HeaderItem>
          <Table.HeaderItem>Property Address</Table.HeaderItem>
          <Table.HeaderItem>Broker</Table.HeaderItem>
        </Table.Header>
        <Table.Rows>
          {data?.properties.map((property: any, index: any) => (
            <Table.Row>
              <Table.RowItem>{property.id}</Table.RowItem>
              <Table.RowItem>{property.address}</Table.RowItem>
              <Table.RowItem>{property.broker.name}</Table.RowItem>
            </Table.Row>
          ))}
        </Table.Rows>
      </Table>
    </Box>
  );
};
/*
En App importar con {}
*/

/*const PropertiesList: React.FC = (props) => {
    console.log(props);
  return (
        <List>
        {}
        </List>
  );
};

export default graphql(GET_PROPERTIES)(PropertiesList);

En App importar sin {}
*/

//let properties = [];
/*client.query({
    query:gql`
    query{
        properties{
          
          address
          
        }
      }
    `
  }).then(result => {//properties.push(result);
  Array(result.data.properties).map(res => console.log(res.address));});
  */
