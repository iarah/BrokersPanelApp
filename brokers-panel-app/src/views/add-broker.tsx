import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { Input, Button, Box } from "@oneloop/jopijs";
import { useToggle } from "@oneloop/hooks";

import { ADD_BROKER } from "../graphql/mutations";
import { GET_BROKERS } from "../graphql/queries";
import { ModalSuccess } from "../components/modal-success";

export const AddBroker: React.FC = props => {
  const [addBroker, { loading, error, data: mutationResult }] = useMutation(
    ADD_BROKER
  );

  const [open, setOpen] = React.useState(false);
  const [openModal, toggleModal] = useToggle(false);
  const [namee, setName] = React.useState("Nombre");
  const [addresss, setAddress] = React.useState("Dirección");

  //REDIRECT AFTER SAVE:
  // let history = useHistory();
  // function handleClick() {
  //   history.push("/brokers_list");
  // }

  return (
    <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          addBroker({
            variables: {
              input: {
                name: namee,
                address: addresss
              }
            },

            // update () recibe la cache y el objeto {createBroker:{id, name, address...}}
            //createBroker = nombre de la mutation (schema)
            update: (cache, { data: createBroker }) => {
              //Q?: porque tiene que ser 'data'? Con otro nombre no anda
              const data: any = cache.readQuery({
                query: GET_BROKERS
              });
              // cache.readQuery() --> { brokers: [{id, name, address}, {}, .. {}] }
              data.brokers = [...data.brokers, createBroker];
              cache.writeQuery({ query: GET_BROKERS, data: data });
            }
          });
        }}
      >
        <Input
          placeholder={namee}
          onChange={(event: any) => setName(event.target.value)}
        />
        <Input
          placeholder={addresss}
          onChange={(event: any) => setAddress(event.target.value)}
        />

        <Button>{"Crear Broker"}</Button>
      </form>
    </Box>
  );
};

// .then(
//   (new_broker) => {
//     const cache_data = client.readQuery({ query: ADD_BROKER });
//     //cache_data.brokers_list.unshift(new_broker);
//     client.writeQuery({
//       query: ADD_BROKER,
//       data: {
//        brokers_list: [...cache_data, new_broker]
//       }
//     })
//   }
// );

/*
<Input id="add-broker-name-id" placeholder={name} onChange={ event => setName(event.target.value) } />
      <Input id="add-broker-address-id" placeholder={address} onChange={ event => setAddress(event.target.value) }/>
      <Button onClick={event => {
        
        addBroker}}
        
      >{'Crear Broker'}</Button> */

// if(error){
//    console.log(error);
//   }else{
//     return <ModalSuccess >El broker fue creado exitosamente</ModalSuccess>;
//   }
//handleClick();

/*if(loading) return <p>Loading...</p>
          
          return <p>{data.id}</p>*/

//toggleModal();
// return (<Modal>
//     {/* <Modal.Header>
//     <Text>El broker fue creado exitosamente</Text>
//     <Button
//       variant="default"
//       size="small"
//       onClick={toggleModel}
//       sx={{ bg: 'inherit', border: 0 }}
//     >
//       X
//     </Button>
//     </Modal.Header>
//     */

//     <Modal.Footer>
//       <Button width={1} variant="secondary" onClick={toggleModal} >
//         Accept
//       </Button>
//     </Modal.Footer> }
//   </Modal>)
