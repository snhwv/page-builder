import React from "react";
import data from "./data";
import { List } from "@material-ui/core";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const SideMenu = ({ menuData = data, level = 0, ...rest }) => {
  return (
    <List {...rest}>
      {menuData.map((item) => {
        const childrenProps = {
          level,
          key: item.path,
          menuItemData: item,
        };
        return item?.children ? (
          <SubMenu {...childrenProps} />
        ) : (
          <MenuItem {...childrenProps} />
        );
      })}
    </List>
  );
};
export default SideMenu;
