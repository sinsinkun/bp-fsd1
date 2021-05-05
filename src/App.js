import { Container } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import List from './components/List/List';

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
        <Navbar />
        <Container maxWidth="md" style={{ marginTop: "64px" }}>
          <Switch>
            <Route exact path="/"><Form /></Route>
            <Route path="/list"><List /></Route>
          </Switch>
        </Container>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
