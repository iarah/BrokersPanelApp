import React from "react";

import { Button, Modal, Text } from "@oneloop/jopijs";

import { GET_PROPERTIES } from "../graphql/queries";

export const ConfirmModal: React.FC = props => {
  return <div></div>;
  // return (
  //   <Modal>
  //     <Modal.Header>
  //       <Text>Borrar la propiedad "{props.deleteProp.address}"?</Text>
  //       <Button
  //         variant="default"
  //         size="small"
  //         onClick={toggleModal}
  //         sx={{ bg: "inherit", border: 0 }}
  //       >
  //         X
  //       </Button>
  //     </Modal.Header>

  //     <Modal.Footer>
  //       <Button width={1 / 3} variant="secondary" onClick={toggleModal}>
  //         Cancelar
  //       </Button>

  //       <Button
  //         width={1 / 3}
  //         onClick={() => {
  //           console.log(props.deleteProp.id);
  //           deleteProp({
  //             variables: {
  //               propId: selectedProp.id
  //             },
  //             update: (cache, { data: { deleteProperty } }) => {
  //               try {
  //                 const data: any = cache.readQuery({
  //                   query: GET_PROPERTIES
  //                 });
  //                 data.properties = deleteProperty;
  //                 cache.writeQuery({ query: GET_PROPERTIES, data: data });
  //               } catch (error) {
  //                 console.error(error);
  //                 return "errorrrr";
  //               }
  //             }
  //           });
  //         }}
  //       >
  //         SÍ
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
};
