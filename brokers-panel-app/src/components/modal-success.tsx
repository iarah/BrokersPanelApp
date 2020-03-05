import React from "react";

import { Text, Button, Modal } from "@oneloop/jopijs";
import { useToggle } from "@oneloop/hooks";

export const ModalSuccess: React.FC = props => {
  const [open, toggle] = useToggle(false);
  return (
    <Modal>
      <Modal.Header>
        <Text>{props.children}</Text>
        <Button
          variant="default"
          size="small"
          onClick={toggle}
          sx={{ bg: "inherit", border: 0 }}
        >
          X
        </Button>
      </Modal.Header>

      <Modal.Footer>
        <Button width={1} variant="secondary" onClick={toggle}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
