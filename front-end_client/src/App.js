import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Layouts */
import Client from "./Layouts/Client";
import Admin from "./Layouts/Admin";
/* End layouts */

function App(props) {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/menu'>
            <Client />
          </Route>
          <Route path='/admin'>
            <Admin />
          </Route>
          <Route path='/'>
            <Client />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
