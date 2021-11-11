import { Box, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import Layout from "./components/layouts/layout";
import DateFnsUtils from "@material-ui/pickers/adapter/dayjs";
import { LocalizationProvider } from "@material-ui/pickers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./views/editor";

import("./App.css" as any);

const theme = createMuiTheme();
const newTheme = {
  ...theme,
  input: {
    lineHeight: "1.1876em",
  },
};
const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={newTheme}>
        <Router>
          <Box height="100%">
            <Layout>
              <Switch>
                <Route path="/">
                  <LocalizationProvider dateAdapter={DateFnsUtils}>
                    <Editor></Editor>
                    {/* <OrderPage></OrderPage> */}
                  </LocalizationProvider>
                </Route>
              </Switch>
            </Layout>
          </Box>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
