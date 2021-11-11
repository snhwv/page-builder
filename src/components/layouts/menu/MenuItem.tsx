import React, { FC, ReactElement } from "react";
import { IRoutes } from "./data";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Icon,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles({
  menuItem: (props: { level: number }) => ({
    paddingLeft: `${props.level * 10}px`,
  }),
});

interface IMenuItemProps {
  menuItemData: IRoutes;
  onClick?: () => void;
  suffix?: ReactElement;
  level?: number;
}

const MenuItem: FC<IMenuItemProps> = ({
  menuItemData,
  onClick,
  suffix,
  children,
  level = 0,
}) => {
  const { title, path, icon } = menuItemData;
  const style = useStyle({ level });
  const history = useHistory();
  const menuItemClickHandler = () => {
    history.push(path);
  };
  return (
    <ListItem
      className={style.menuItem}
      button
      onClick={onClick || menuItemClickHandler}
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={title} />
      {suffix && React.cloneElement(suffix)}
      {children}
    </ListItem>
  );
};
export default MenuItem;
