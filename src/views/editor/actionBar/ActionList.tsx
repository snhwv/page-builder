/**
 * action列表，列表数据从store中获取，可在此配置ActionType对应的Icon图标
 *
 * @summary action操作栏>action列表
 * @author yangpan
 *
 * Created at     : 2021-03-24 14:20:10
 * Last modified  : 2021-04-01 15:00:48
 */

import React from "react";
import {
  Box,
  Button,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDataAddOne,
  ActionType,
  IAjaxFetchAction,
  selectActionAll,
} from "@store/features/editor";

const useStyle = makeStyles(() => ({
  filter: {
    width: "100%",
    height: 36,
    "& > .MuiFormControl-root": {
      height: 36,
    },
    "& > .MuiFilledInput-root": {
      height: 36,
    },
  },
}));
const ActionListContainer: React.FC<{
  onClickHandler: (id: string) => void;
}> = React.memo((props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddAjaxFetchAction = () => {
    const defaultAjaxAction: Omit<IAjaxFetchAction, "id" | "name"> = {
      type: "ajaxFetchAction",
      onSuccessActionId: "",
      onFailedActionId: "",
      url: "",
      method: "GET",
      query: [],
      data: [],
      headers: [],
      result: {},
    };
    dispatch(actionDataAddOne({ ...defaultAjaxAction }));
    handleClose();
  };
  const handleAddJsAction = () => {
    dispatch(
      actionDataAddOne({
        type: "jsAction",
      })
    );
    handleClose();
  };
  const handleAddSqlAction = () => {
    dispatch(
      actionDataAddOne({
        type: "sqlAction",
      })
    );
    handleClose();
  };
  const handleToggleVisibleAction = () => {
    dispatch(
      actionDataAddOne({
        type: "toggleVisibleAction",
      })
    );
    handleClose();
  };

  const style = useStyle();
  return (
    <Grid container direction={"column"} style={{ height: "100%" }}>
      <Grid
        container
        item
        style={{ padding: 10, border: `1px solid #e8e8e8f3`, borderLeft: 0 }}
      >
        <Grid item xs>
          <Box mr={1}>
            <TextField
              style={{}}
              label="请输入"
              variant="filled"
              size={"small"}
              className={style.filter}
            />
          </Box>
        </Grid>
        <Grid container item xs={4} justify={"center"} alignItems={"center"}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Open Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAddAjaxFetchAction}>
              ajaxFetchAction
            </MenuItem>
            <MenuItem onClick={handleAddJsAction}>jsAction</MenuItem>
            <MenuItem onClick={handleAddSqlAction}>sqlAction</MenuItem>
            <MenuItem onClick={handleToggleVisibleAction}>
              toggleVisibleAction
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid
        item
        xs
        style={{
          padding: 10,
          border: `1px solid #e8e8e8f3`,
          borderLeft: 0,
          borderTop: 0,
          overflowY: "auto",
        }}
      >
        <ActionList {...props}></ActionList>
      </Grid>
    </Grid>
  );
});
const actionIcon: { [key in ActionType]: string } = {
  sqlAction: "star",
  jsAction: "star",
  ajaxFetchAction: "star",
  toggleVisibleAction: "star",
};

const ActionList: React.FC<{
  onClickHandler: (id: string) => void;
}> = React.memo(({ onClickHandler }) => {
  const actions = useSelector(selectActionAll);

  const actionClickHandler = (item: any) => () => {
    onClickHandler(item.id);
  };
  return (
    <List component="nav">
      {actions?.map((item) => {
        return (
          <ListItem key={item.id} button onClick={actionClickHandler(item)}>
            <ListItemIcon>
              <Icon>{actionIcon[item.type]}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        );
      })}
    </List>
  );
});
export default ActionListContainer;
