import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Home from './Components/Home';
import Details from './Components/Details';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Details' component={Details} />
        </Switch>
      </Router>
    </>
  )
}

export default App;