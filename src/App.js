import React from 'react';
import './App.css';
import './components/Weather.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Weather from './components/pages/Weather';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component = {Home} />
          <Route path="/Weather" component = {Weather}/>

        </Switch>
      </Router>
    </>
  );
}

export default App;
