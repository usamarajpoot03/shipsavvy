import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import { Link } from "react-router-dom";
import ROLES from "../../constants/roles";
import UserContext from "../auth/userContext/UserContext";
const sideBarMenu = [
  {
    id: 0,
    title: "Profile",
    redirect: "/profile",
    roles: [ROLES.USER],
    icon: <DashboardIcon />,
  },
  {
    id: 1,
    title: "Addresses",
    redirect: "/addresses",
    roles: [ROLES.USER],
    icon: <AttachMoneyRoundedIcon />,
  },
];

export default function Sidebar() {
  const user = useContext(UserContext);
  return (
    <List>
      {sideBarMenu.map((entry) => {
        if (!entry.roles.includes(user["Role"])) return null;
        return (
          <ListItem button component={Link} to={entry.redirect}>
            <ListItemIcon>{entry.icon}</ListItemIcon>
            <ListItemText primary={entry.title} />
          </ListItem>
        );
      })}
    </List>
  );
}
