import React from 'react';
import { BrowserRouter as Router, Route, Routes ,NavLink} from 'react-router-dom';
import logo from './logo.svg';
import Home from '../src/pages/home';
import Cart from '../src/pages/cart';
import Menu from '../src/pages/menu';

import './App.css';

function App() {
  return (
   <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/cart' element={<Cart/>} />
        <Route exact path='/menu' element={<Menu/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
