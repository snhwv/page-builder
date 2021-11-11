import {
  AppBar,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEditorContext } from "@editor/constants/EditorContext";

const ContentAccpt = ["button", "form"];
const OperationAccpt = ["iconButton"];

export const CanvasComponent: React.FC<any> = (props) => {
  const { containerChildrenDataArr, DropTemplate } = props || {};

  return (
    <Paper elevation={3} style={{ height: "100%" }}>
      <Grid container direction="column" style={{ height: "100%" }}>
        <Grid item style={{ width: "100%" }}>
          {/* drawer的toolbar,配置操作按钮 */}
          <DrawerToolBar
            {...props}
            CustomOperation={() => {
              return containerChildrenDataArr?.[1] ? (
                <DropTemplate
                  {...containerChildrenDataArr[1]}
                  accept={OperationAccpt}
                ></DropTemplate>
              ) : (
                <div></div>
              );
            }}
          ></DrawerToolBar>
        </Grid>
        <Grid item xs style={{ overflow: "visible" }}>
          {containerChildrenDataArr?.[0] ? (
            <DropTemplate
              {...containerChildrenDataArr[0]}
              accept={ContentAccpt}
            ></DropTemplate>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

function DrawerToolBar(props: { id: string; CustomOperation: React.FC<any> }) {
  const context = useEditorContext();
  const { CustomOperation } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            {context.getIconByType("arrowBackIos")}
          </IconButton>
          <Typography variant="h6" noWrap style={{ marginRight: "auto" }}>
            Material-UI
          </Typography>
          <div
            style={{
              display: "flex",
              width: 200,
              height: 50,
              background: "white",
              color: "#333",
            }}
          >
            <CustomOperation></CustomOperation>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
