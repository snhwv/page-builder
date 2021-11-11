/**
 * action详情，根据ActionType的不同，对应./components中的不同文件
 * 如：ActionType为ajaxFetchAction的，对应./components/AjaxFetchAction文件
 * @summary action操作栏>action详情
 * @author yangpan
 *
 * Created at     : 2021-03-24 14:22:28
 * Last modified  : 2021-04-01 16:54:28
 */

import React from "react";
import { Grid } from "@material-ui/core";
import JSAction from "./components/JSAction";
import AjaxFetchAction from "./components/AjaxFetchAction";
import { useSelector } from "react-redux";
import {
  ActionType,
  getActionDataById,
  IAjaxFetchAction,
  IJsAction,
  ISqlAction,
  IStoreAction,
  IToggleVisibleAction,
} from "@store/features/editor";
import CodeEditor from "@components/components/CodeEditor";
import ToggleVisibleAction from "./components/ToggleVisibleAction";
import SqlAction from "./components/SqlAction";

const DetailMapper: { [key in ActionType]: React.FC<IStoreAction> } = {
  sqlAction: (props) => <SqlAction {...(props as ISqlAction)}></SqlAction>,
  jsAction: (props) => <JSAction {...(props as IJsAction)}></JSAction>,
  ajaxFetchAction: (props) => (
    <AjaxFetchAction {...(props as IAjaxFetchAction)}></AjaxFetchAction>
  ),
  toggleVisibleAction: (props) => (
    <ToggleVisibleAction
      {...(props as IToggleVisibleAction)}
    ></ToggleVisibleAction>
  ),
};

const ActionDetail: React.FC<{
  id: string;
}> = ({ id }) => {
  const actionData = useSelector((state) => getActionDataById(state, id));
  if (!actionData) {
    return <CodeEditor></CodeEditor>;
  }
  const DetailComp = DetailMapper[actionData.type];
  return (
    <Grid container direction={"column"} style={{ height: "100%" }}>
      <Grid
        container
        item
        style={{
          padding: 10,
          border: `1px solid #e8e8e8f3`,
          borderLeft: 0,
          height: 58,
        }}
      >
        {actionData?.name}
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
        <DetailComp {...actionData}></DetailComp>
      </Grid>
    </Grid>
  );
};
export default ActionDetail;
