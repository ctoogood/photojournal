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
  },
});

export default theme;
