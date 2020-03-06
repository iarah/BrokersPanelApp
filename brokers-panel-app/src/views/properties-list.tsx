import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";

import { Table, Box, Button, Modal, Text, Input } from "@oneloop/jopijs";
import { useToggle } from "@oneloop/hooks";

import { GET_PROPERTIES } from "../graphql/queries";
import { UPDATE_PROPERTY } from "../graphql/mutations";

export const PropertiesList: React.FC = () => {
  const { data } = useQuery(GET_PROPERTIES);
  const [modalOpen, toggleModal] = useToggle(false);
  const [selectedProp, setSelectedProp] = useState();

  const [address, setAddress] = useState();

  const [updateProp, { loading, error, data: mutationResult }] = useMutation(
    UPDATE_PROPERTY
  );

  return (
    <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
      <Table>
        <Table.Header sx={{ textAlign: "center" }}>
          <Table.HeaderItem>ID</Table.HeaderItem>
          <Table.HeaderItem>Address</Table.HeaderItem>
          <Table.HeaderItem>Broker</Table.HeaderItem>
          <Table.HeaderItem> ...</Table.HeaderItem>
        </Table.Header>
        <Table.Rows>
          {data?.properties.map((property: any, index: any) => (
            <Table.Row>
              <Table.RowItem>{property.id}</Table.RowItem>
              <Table.RowItem sx={{ paddingRight: "15px" }}>
                {property.address}
              </Table.RowItem>
              <Table.RowItem sx={{ paddingRight: "30px" }}>
                {property.broker.name}
              </Table.RowItem>
              <Table.RowItem>
                <Button
                  sx={{ bg: "lightgray" }}
                  onClick={() => {
                    setSelectedProp(property);
                    toggleModal();
                  }}
                >
                  {" "}
                  Editar{" "}
                </Button>
              </Table.RowItem>
            </Table.Row>
          ))}
        </Table.Rows>
      </Table>

      {modalOpen && (
        <Modal>
          <Modal.Header>
            <Text>EDITAR PROPIEDAD #{selectedProp.id}</Text>
            <Button
              variant="default"
              size="small"
              onClick={toggleModal}
              sx={{ bg: "inherit", border: 0 }}
            >
              X
            </Button>
          </Modal.Header>

          <Modal.Body>
            Direccion:
            <Input
              sx={{
                border: "solid black 1px"
              }}
              placeholder={selectedProp.address}
            />
            Precio:{" "}
            <Input
              sx={{
                border: "solid black 1px"
              }}
              placeholder={selectedProp.price}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button width={1 / 3} variant="secondary" onClick={toggleModal}>
              Cancelar
            </Button>
            <Button
              width={1 / 3}
              onClick={() => {
                updateProp({
                  variables: {
                    nuevosCampos: {
                      address: "123 LALALA"
                    }
                  }
                });
                toggleModal();
              }}
            >
              {/* aplicar cambios */}
              Aplicar cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
