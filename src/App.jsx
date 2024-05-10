import React, { useState } from 'react';
import Home from './components/Home';
import { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

export const InputContext = createContext();

const App = () => {
  const [inputValue, setInputValue] = useState("");

  const value = {
    inputValue, setInputValue
  }

  return (
    <InputContext.Provider value={value}>
      <>
        <Routes>
          <Route path="" element={ <Home/>} />
          <Route path="/home/:emailId" element={ <Home/>} />
          <Route path="*" element={ <Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </>
    </InputContext.Provider>
      
  )
}

export default App
