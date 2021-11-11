import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AppsIcon from "@material-ui/icons/Apps";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LockIcon from "@material-ui/icons/Lock";
export const IconMapper: { [key: string]: JSX.Element } = {
  add: <AddIcon />,
  delete: <DeleteIcon />,
  search: <SearchIcon />,
  edit: <EditIcon />,

  arrowBackIos: <ArrowBackIosIcon />,
  arrowForwardIos: <ArrowForwardIosIcon />,
  apps: <AppsIcon />,
  clear: <ClearIcon />,
  expandLess: <ExpandLessIcon />,
  expandMore: <ExpandMoreIcon />,
  formatListBulleted: <FormatListBulletedIcon />,
  lock: <LockIcon />,
};
