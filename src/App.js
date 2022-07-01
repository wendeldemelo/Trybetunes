import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={ Login } />
                <Route path="/search" component={ Search } />
                <Route path="/album/:id" component={ Album } />
                <Route path="/favorites" component={ Favorites } />
                <Route exact path="/profile" component={ Profile } />
                <Route path="/profile/edit" component={ ProfileEdit } />
                <Route exact path="*" component={ NotFound } />
              </Switch>
            </div>
          </div>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
