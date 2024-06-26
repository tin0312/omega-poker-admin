import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../context/AuthProvider";

export const MainListItems = () => {
  const { logout } = useAuth();

  return (
    <React.Fragment>
      {/* Sign out button */}
      <ListItemButton sx={{marginTop: "50px"}} onClick={async () => await logout()}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItemButton>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link to="/customers" style={{ textDecoration: "none", color: "black" }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};

// export const SecondaryListItems = () => (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Employees
//     </ListSubheader>
//     <Link to="employees" style={{ textDecoration: "none", color: "black" }}>
//       <ListItemButton>
//         <ListItemIcon>
//           <AssignmentIcon />
//         </ListItemIcon>
//         <ListItemText primary="Employees" />
//       </ListItemButton>
//     </Link>
//   </React.Fragment>
// );
