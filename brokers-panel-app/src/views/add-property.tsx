import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { useToggle } from "@oneloop/hooks";
import { Input, Button, Box, Collapsible } from "@oneloop/jopijs";

import { ADD_PROPERTY } from "../graphql/mutations";
import { GET_BROKERS, GET_PROPERTIES } from "../graphql/queries";

export const AddProperty: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("Dirección");
  const [brokerId, setBrokerId] = React.useState(-1);
  const [extraFieldsOpen, setOpenExtraFields] = React.useState(false);

  const [openModal, toggleModal] = useToggle(false);

  const [addProperty] = useMutation(ADD_PROPERTY);
  const { data: brokersGet, loading, error } = useQuery(GET_BROKERS);

  console.log(brokerId);

  return (
    <Box sx={{ paddingTop: "20px", marginLeft: "40%" }}>
      <select id="brokersSelect">
        {[<option value={-1}> Elija un broker</option>].concat(
          brokersGet?.brokers.map((broker: any) => (
            <option value={broker.id} onClick={() => setBrokerId(broker.id)}>
              {broker.name}
            </option>
          ))
        )}
      </select>
      <Input
        placeholder={address}
        onChange={(event: any) => setAddress(event.target.value)}
        sx={{ marginTop: "10px" }}
      />
      <Collapsible
        width={1 / 3}
        isOpen={!extraFieldsOpen}
        sx={{ marginBottom: "20px" }}
      >
        <Collapsible.Button
          variant="default"
          onClick={() => setOpenExtraFields(!extraFieldsOpen)}
        >
          Campos opcionales
        </Collapsible.Button>
        <Collapsible.Body>lalala</Collapsible.Body>
      </Collapsible>
      <Button
        onClick={(e: any) => {
          if (brokerId > -1 && address.trim().length) {
            addProperty({
              variables: {
                myVar: {
                  brokerId: brokerId,
                  address: address
                }
              },
              //update recibe cache y {data:{ createProperty: {address}}}
              update: (cache, myObj) => {
                //Q?: porque no lo puedo nombrar con algo distinto a 'data'
                const data: any = cache.readQuery({
                  query: GET_PROPERTIES
                });
                data.properties = [
                  ...data.properties,
                  myObj.data.createProperty
                ];
                cache.writeQuery({ query: GET_PROPERTIES, data });
              }
            });
          }
        }}
      >
        {"Crear Property"}
      </Button>
    </Box>
  );
};

// <form onSubmit={(e:any) => {
//   addProperty({
//     variables: {
//       input: {
//         name: namee,
//         address: addresss
//       }
//     }
//   });
//   } }>
{
  /* {loading && <p>processing...</p>}
      {error && <p>{error.message}</p>}
      {data && <p>El broker {data.name} fue creado exitosamente</p>} */
}
{
  /* {data && <ModalSuccess >El broker fue creado exitosamente</ModalSuccess>} */
}
