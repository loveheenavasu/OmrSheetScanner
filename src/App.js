import logo from './logo.svg';
//import './App.css';
//import'./Teacher/Scan'
import Scan from './Teacher/Scan';

import {
  BrowserRouter as Router, Switch, Route, Link, useLocation
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Scan />
  </Router>
  );
}

export default App;
