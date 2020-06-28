import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter, Switch, Route} from 'react-router-dom';
import PokeDetailWrapper from './components/PokeList/PokeDetailWrapper/PokeDetailWrapper';
 
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:name/details/" component={PokeDetailWrapper} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
