import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { Input, Button, Box, Modal, Text } from "@oneloop/jopijs";
import { useToggle } from "@oneloop/hooks";

import { ADD_BROKER } from "../graphql/mutations";
import { GET_BROKERS } from "../graphql/queries";

export const AddBroker: React.FC = props => {
  const [openModal, toggleModal] = useToggle(false);
  const [namee, setName] = React.useState("Nombre");
  const [addresss, setAddress] = React.useState("Dirección");
  //const [mutationError, setMutationError] = React.useState(ApolloError);

  const [addBroker, { loading, error, data: mutationResult }] = useMutation(
    ADD_BROKER,
    {
      onCompleted(data) {
        toggleModal();
        console.log(data);
      }
      //   // onError(err) {
      //   //   setMutationError(err);
      //   //   console.log(err);
      //   //   toggleModal();
      //   // }
    }
  );

  //REDIRECT AFTER SAVE:
  let history = useHistory();
  function redirectToBrokers() {
    history.push("/brokers_list");
  }

  return (
    <Box>
      <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
        <div>
          <Input
            placeholder={namee}
            onChange={(event: any) => setName(event.target.value)}
          />
          <Input
            placeholder={addresss}
            onChange={(event: any) => setAddress(event.target.value)}
          />

          <Button
            onClick={(e: any) => {
              //e.preventDefault();

              addBroker({
                variables: {
                  input: {
                    name: namee,
                    address: addresss
                  }
                },

                // update () recibe la cache y el objeto {createBroker:{id, name, address...}}
                // createBroker = nombre de la mutation (en el schema)
                //    The first is an instance of a DataProxy object which has some methods
                //     which will allow you to interact with the data in your store.
                //    The second is the response from your mutation - either the optimistic response,
                //    or the actual response returned by your server(see the mutation result
                //    described in the mutation render prop section for more details).
                update: (cache, { data: { createBroker } }) => {
                  try {
                    //Q?: porque tiene que ser 'data'? Con otro nombre no anda
                    const data: any = cache.readQuery({
                      query: GET_BROKERS
                    });
                    // cache.readQuery() --> { brokers: [{id, name, address}, {}, .. {}] }
                    data.brokers = [...data.brokers, createBroker];
                    cache.writeQuery({ query: GET_BROKERS, data: data });
                  } catch (error) {
                    console.error(error);
                    return "errorrrr";
                  }
                }
              });
            }}
          >
            {"Crear Broker"}
          </Button>
        </div>
        {openModal && (
          <Modal>
            <Modal.Header>
              {/* {mutationError ? (
                <Text>Se produjo un error al intentar crear broker.</Text>
              ) : (
                <Text> Nuevo Broker creado</Text>
              )} */}
              <Text> Nuevo Broker creado</Text>
              <Button
                variant="default"
                size="small"
                onClick={toggleModal}
                sx={{ bg: "inherit", border: 0 }}
              >
                X
              </Button>
            </Modal.Header>

            <Modal.Footer>
              <Button width={1 / 3} variant="secondary" onClick={toggleModal}>
                Aceptar
              </Button>
              <Button
                width={1 / 3}
                onClick={() => {
                  redirectToBrokers();
                }}
              >
                Ir a la lista de brokers
              </Button>
              {/* //TODO: Limpiar los inputs */}
            </Modal.Footer>
          </Modal>
        )}
      </Box>
    </Box>
  );
};
