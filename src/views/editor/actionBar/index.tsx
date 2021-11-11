/**
 * action操作栏，增加、删除、查找、修改各类action
 * 由同级目录：ActionList.tsx、ActionDetail.tsx组成
 * @summary action操作栏
 * @author yangpan
 *
 * Created at     : 2021-03-24 14:17:18 
 * Last modified  : 2021-03-24 14:19:48
 */

import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ActionList from "./ActionList";
import ActionDetail from "./ActionDetail";

const ActionBar = () => {
  const [id, setId] = useState("");
  return (
    <React.Fragment>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={3}>
          <ActionList onClickHandler={setId}></ActionList>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <ActionDetail id={id}></ActionDetail>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ActionBar;
