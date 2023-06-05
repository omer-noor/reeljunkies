import React, { useState, createContext, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
//import Account from './Account';
import LoginForm from './components/LoginForm';
import MovieContainer from './components/MovieContainer';
import UserAccountInfo from './components/UserAccountInfo';
import SignupForm from './components/SignupForm';
import UserPage from './components/UserPage';
import PostForm from './components/PostForm';

const NavbarContext = createContext();

function App() {
  const [isPostFormVisible, setIsPostFormVisible] = useState(''); // Or initial state of your choice
  return (
    <div className="font-Inter min-h-screen bg-gradient-to-r from-indigo-950 via-violet-950 to-slate-950">
      <Router>
        <NavbarContext.Provider value={{ isPostFormVisible, setIsPostFormVisible }}>
        <div>
          <Navbar />          
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/movies" element={<MovieContainer/>} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/signup" element={<SignupForm/>}/>   
            <Route path="/postReview" element={<PostForm/>}/>   
            <Route path="/accountChange" element={<UserAccountInfo />} />         
          </Routes>
        </div>
        </NavbarContext.Provider>
      </Router>
    </div>
  );
}

export default App;
export {NavbarContext};
