import React from "react";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./themes/muiTheme";
import Header from "./components/header/Header";
import Routes from "./Routes";

import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
