import {ThemeProvider} from '@material-ui/core';
import {createBrowserHistory} from "history";
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {StoreContext} from 'storeon/react';
import {createGlobalStyle} from 'styled-components';
import './App.css';
import DonationOverview from "./pages/DonationOverview";
import InvitationCode from "./pages/InvitationCode";
import SignUp from "./pages/SignUp";
import {store} from './store';
import {appTheme} from "./theme/theme";


const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  body,html,#root {
    margin : 0px;
    padding:0;
    height: 100%;
    width: 100%;
  }
`;

const history = createBrowserHistory();

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <StoreContext.Provider value={store}>
                <GlobalStyle />
                <Router history={history}>
                    <Switch>
                        <Route path="/anmeldung">
                            <InvitationCode />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route path="/meinespenden">
                            <DonationOverview />
                        </Route>
                    </Switch>
                </Router>
            </StoreContext.Provider>
        </ThemeProvider>
    );
}

export default App;
