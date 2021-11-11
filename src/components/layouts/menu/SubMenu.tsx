import React, { useState } from "react";
import { IRoutes } from "./data";
import { Collapse, Icon } from "@material-ui/core";
import SideMenu from "./SideMenu";
import MenuItem from "./MenuItem";

const SubMenu = ({
  menuItemData,
  level,
}: {
  menuItemData: IRoutes;
  level: number;
}) => {
  const [open, setOpen] = useState(true);
  const triggerCollapse = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <MenuItem
        level={level}
        menuItemData={menuItemData}
        onClick={triggerCollapse}
        suffix={open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      />
      {menuItemData?.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SideMenu
            level={level + 1}
            disablePadding
            menuData={menuItemData.children}
          ></SideMenu>
        </Collapse>
      )}
    </React.Fragment>
  );
};

export default SubMenu;
