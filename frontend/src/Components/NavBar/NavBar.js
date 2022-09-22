import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../AuthContext/AuthContext";

function NavBar() {
  let navigate = useNavigate();
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" sx={{ background: "#c7c7c7" }}>
        <Toolbar>
          <Typography style={{ textDecoration: "none" }} color="black">
            {" "}
            <Link
              to="/"
              sx={{ textDecoration: "none", cursor: "pointer", color: "black" }}
            >
              My Library
            </Link>
          </Typography>

          {!user ? (
            <div style={{ marginLeft: "auto" }}>
              <Link to="admin/login/" style={{ textDecoration: "none" }}>
                <Button sx={{ marginLeft: "auto" }}>login</Button>
              </Link>
              <Link to="admin/signup/" style={{ textDecoration: "none" }}>
                <Button sx={{ marginLeft: "10px" }}>signup</Button>
              </Link>
            </div>
          ) : (
            <div style={{ marginLeft: "auto" }}>
              <Button onClick={() => navigate("/add_book")}>add book</Button>
              <Button sx={{ marginLeft: "10px" }} onClick={logoutUser}>
                logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
