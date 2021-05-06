import { Container } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreProvider } from './components/GlobalStore';
import Navbar from './components/Navbar';
import Form from './components/Form';
import List from './components/List/List';
import LoadingOverlay from './components/LoadingOverlay';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#651fff"
    },
    secondary: {
      main: "#fff"
    }
  }
})

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <StoreProvider>

          <Navbar />
          <LoadingOverlay />

          <Container maxWidth="md" style={{ marginTop: "64px" }}>
            <Switch>
              <Route exact path="/"><Form /></Route>
              <Route path="/list"><List /></Route>
              <Route path="/user"><Form /></Route>
            </Switch>
          </Container>
          
        </StoreProvider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
