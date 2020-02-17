import React from "react";
import { Heading } from "@oneloop/jopijs";
export const Title: React.FC = (props) => {
  return (
    <Heading as="h1" sx={{ textAlign: "center", m: "20px 0" }}>
       Properties
    </Heading>
  );
};