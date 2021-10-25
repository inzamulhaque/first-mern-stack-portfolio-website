import React, { createContext, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import NavBar from './component/NavBar';
import Home from './component/Home';
import About from './component/About';
import Skills from './component/Skills';
import Contact from './component/Contact';
import signin from './component/Signin';
import Signup from './component/Signup';
import Profile from './component/Profile';
import Forgot from './component/Forgot';
import EmailVerify from './component/EmailVerify';
import OtpForgot from './component/OtpForgot';
import Footer from './component/Footer';
import Password from './component/Password';
import { initialState, reducer } from "./reducer/UseReducer";
import './App.css';

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/skills" component={Skills}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/signin" component={signin}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/forgot" component={Forgot}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/EmailVerify" component={EmailVerify}/>
          <Route exact path="/OtpForgot" component={OtpForgot}/>
          <Route exact path="/PasswordWrite" component={Password}/>
          <Route path="*" component={Home}/>
        </Switch>
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;
