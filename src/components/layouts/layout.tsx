import { Grid } from "@material-ui/core";
import React from "react";
// import SideMenu from "./menu/Index";
import AppBar from "./header";
// const useStyle = makeStyles({
//   menu: (props: { menuWidth: number }) => ({
//     width: `${props.menuWidth}px`,
//   }),
// });
// const MENU_WIDTH = 240;
const Layout = ({ children }: { children: any }) => {
  // const style = useStyle({ menuWidth: MENU_WIDTH });
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item style={{ width: "100%" }}>
        <AppBar />
      </Grid>
      {/* <Grid container xs>
        <Grid className={style.menu} item>
          <SideMenu />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid> */}

      <Grid item xs style={{ overflow: "auto" }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
