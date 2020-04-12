import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#4fa1c4",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#426A79",
      secondary: "#BBBBBB",
    },
    background: {
      button: "#4fa1c4",
    },
  },
});

export default theme;
