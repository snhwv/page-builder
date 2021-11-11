import { Button } from "@material-ui/core";
import React from "react";

export const SideBarComponent: React.FC<{}> = (props) => (
  <Button
    // {...props}
    variant="contained"
    color="primary"
    style={{ width: "100%", height: "100%" }}
  >
    button
  </Button>
);
