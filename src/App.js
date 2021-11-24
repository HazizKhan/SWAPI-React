import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Provider } from "react-redux";
import Main from "./components/Main";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Toolbar>
        </AppBar>
        <Main />
      </Box>
    </Provider>
  );
}

export default App;
