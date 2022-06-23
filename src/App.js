import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Login /> } />
          </Routes>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
