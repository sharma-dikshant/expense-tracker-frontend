import styles from "./header.module.css";
import { useState } from "react";
import { Link } from "react-router";

import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

export default function Header() {
  const [user, setUser] = useState("Dikshant");
  return (
    <div className={styles.header}>
      <Link to="/">Expense Tracker</Link>
      {user ? (
        <div>
          <UserAvatar>{user.toUpperCase()[0]}</UserAvatar>
        </div>
      ) : (
        <Button variant="contained">
          <Link to="/auth">Login</Link>
        </Button>
      )}
    </div>
  );
}

function UserAvatar({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <button
        onClick={handleClick}
        style={{ backgroundColor: "#f8f9fa", border: "none" }}
      >
        <Avatar sx={{ color: "white", bgcolor: "darkgreen" }}>
          {children[0]}
        </Avatar>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "",
        }}
      >
        <button
          style={{
            backgroundColor: "#c73d60",
            border: "none",
            color: "whitesmoke",
          }}
        >
          Logout
        </button>
      </Popover>
    </div>
  );
}

function Menubox() {}
