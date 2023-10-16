import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';

import './App.css';

//--------------------------------------------------------------------------------------------------------
import PrivateRoute from './utils/privateRoute';
import UserLoggedOut from './utils/userLoggedOut';

import Header from './components/Headers';
import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage'

import TweeahCreate from './pages/TweeahCreate';

import TweeahPage from './pages/TweeahPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'

const App = () =>{

  return (
    <div className="App" style={{marginLeft:'20%'}}>
      <Router>
        <AuthProvider>
        <ApiProvider>
          <Header/>
          <Sidebar/>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/create' element={<TweeahCreate/>}></Route>
              <Route path='/:id' element={<TweeahPage/>}></Route>
              <Route path='/login' element={<UserLoggedOut> <LoginPage/> </UserLoggedOut>}></Route>
              <Route path='/register' element={<UserLoggedOut> <RegisterPage/> </UserLoggedOut>}></Route>
    
            </Routes>
        </ApiProvider>
        </AuthProvider>
      </Router>
    </div>
  )
}


export default App;
