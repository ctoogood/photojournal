import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import "./header.scss";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
  toolBar: {
    backgroundColor: "white",
  },
  appBar: {
    backgroundColor: "white",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "1000px",
    margin: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette,
  },
  title: {
    fontWeight: 400,
    fontSize: "1.4rem",
    color: "#426A79",
    cursor: "pointer",
    textDecoration: "none",
  },
  button: {
    position: "absolute",
    right: 0,
    backgroundColor: "#4fa1c4",
    color: "white",
    fontWeight: "normal",
    marginRight: "1rem",
    "&:hover": {
      color: "#4fa1c4",
    },
    drawer: {
      marginRight: "2rem",
      padding: "2rem",
      width: "400px",
    },
  },
  accountButton: {
    display: "inline",
  },
  dropdown: {
    marginBottom: "1rem",
  },
}));

const Header = (loggedIn) => {
  const history = useHistory();
  const theme = useTheme();
  const appContext = useContext(AuthContext);
  const { user } = appContext;
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setToggle(!toggle);
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      history.push("/");
      setAnchorEl(null);
    } catch (e) {
      console.log(e);
    }
  };

  const list = () => (
    <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {!user ? (
          <ListItem button>
            <Link to="/login">
              <ListItemText>Login/Sign-Up</ListItemText>
            </Link>
          </ListItem>
        ) : (
          <>
            <ListItem button>
              <Link to={`/profile/${user.username}`}>
                <ListItemText>Profile</ListItemText>
              </Link>
            </ListItem>
            <ListItem onClick={signOut} button>
              <Link to="/">
                <ListItemText>Sign Out</ListItemText>
              </Link>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
      <AppBar className={classes.toolBar} position="static">
        <Toolbar className={classes.appBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color={theme.primary}
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <Drawer anchor="left" open={toggle} onClose={toggleDrawer}>
              {list()}
            </Drawer>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} variant="h6">
              Photojournal<b>it</b>
            </Typography>
          </Link>
          {!user ? (
            <Link className="header__link" to="/login">
              <Button color="inherit" className={classes.button}>
                Login
              </Button>
            </Link>
          ) : (
            <>
              <div className="header__account">
                <AccountCircleIcon
                  className={classes.accountButton}
                  color={theme.primary}
                />
                <p>{user.attributes.email}</p>
                <IconButton className={classes.dropdown} onClick={handleClick}>
                  <ArrowDropDownIcon />
                </IconButton>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/profile/${user.username}`}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/settings">My account</Link>
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <Link to="/">Logout</Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
