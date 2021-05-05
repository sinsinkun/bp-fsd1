import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        Navbar
        <Switch>
          <Route exact link="/">Form</Route>
          <Route link="/list">List of entries</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
