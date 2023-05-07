import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HomePage from './components/Homepage';

function App() {
  return (
    <div className="font-Inter min-h-screen bg-gradient-to-r from-indigo-950 via-violet-950 to-slate-950">
      <HomePage />
    </div>
  );
}

export default App;
