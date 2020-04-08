import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { Collapsible, Box, Button, Modal, Text, Input } from "@oneloop/jopijs";
import { useToggle } from "@oneloop/hooks";

import { GET_BROKERS } from "../graphql/queries";
import { EDIT_BROKER } from "../graphql/mutations";

export const BrokersList: React.FC = () => {
  const { data } = useQuery(GET_BROKERS);
  // const [editBroker] = useMutation(EDIT_BROKER);
  const [openId, setOpen] = React.useState(-1);
  const [selectedBroker, setSelectedBroker] = React.useState();
  // const [newAddress, setNewAddress] = React.useState();
  // const [newName, setNewName] = React.useState();
  // let editedName = "";
  // let editedAddress = "";
  // const [modalOpen, toggleModal] = useToggle(false);

  return (
    <>
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
              {/* <Button
                onClick={() => {
                  setSelectedBroker(broker);
                  toggleModal();
                }}
              >
                {" "}
                Editar{" "}
              </Button> */}
            </Collapsible.Body>
          </Collapsible>
        ))}
      </Box>
      {/* {modalOpen && (
        <Modal>
          <Modal.Header>
            <Text>EDITAR BROKER</Text>
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
            <form>
              Nombre:
              <Input
                sx={{
                  border: "solid black 1px"
                }}
                placeholder={selectedBroker.name}
                onChange={(e: any) => {
                  editedName = e.target.value;
                }}
              />
              Dirección:
              <Input
                sx={{
                  border: "solid black 1px"
                }}
                placeholder={selectedBroker.address}
                onChange={(e: any) => {
                  editedAddress = e.target.value;
                }}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button width={1 / 3} variant="secondary" onClick={toggleModal}>
              Cancelar
            </Button>

            <Button
              width={1 / 3}
              onClick={() => {
                // editBroker({
                //   variables: {
                //     input: {
                //       id: selectedBroker.id,
                //       name: editedName,
                //       address: editedAddress
                //     }
                //   }
                //   // update: (cache, { data: { deleteProperty } }) => {
                //   //   try {
                //   //     const data: any = cache.readQuery({
                //   //       query: GET_PROPERTIES
                //   //     });
                //   //     data.properties = deleteProperty;
                //   //     cache.writeQuery({ query: GET_PROPERTIES, data: data });
                //   //   } catch (error) {
                //   //     console.error(error);
                //   //     return "errorrrr";
                //   //   }
                //   // }
                // });
                console.log("CLICK");
              }}
            >
              EDITAR
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}
    </>
  );
};
