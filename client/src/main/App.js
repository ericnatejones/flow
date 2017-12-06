import React from 'react';
import './App.css';

import LoginSignUpContainer from './components/login-signup';
import RiverListContainer from './components/river-list';
import AddRiverForm from './components/add-river-form';
import ModalButton from "./components/ModalButton"

import { connect } from "react-redux";

function App(props){
    return (
      <div className="App">
        <LoginSignUpContainer/>
        {props.isAuthenticated ?
          <div>
            <RiverListContainer/>
            <ModalButton />
            <AddRiverForm/>
          </div>
          :
          <div>
            <ModalButton />
            <AddRiverForm/>
            <RiverListContainer/>
          </div>
        }
      </div>
    );
}

export default connect(state => state.authReducer)(App);
