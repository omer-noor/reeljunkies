import {React} from 'react';
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

function App() {
  return (
    <div className="font-Inter min-h-screen bg-gradient-to-r from-indigo-950 via-violet-950 to-slate-950">
      <Router>
        <div>
          <Navbar />          
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/movies" element={<MovieContainer/>} />
            <Route path="/account" element={<UserPage />} />
            <Route path="/signup" element={<SignupForm/>}/>   
            <Route path="/accountChange" element={<UserAccountInfo />} />         
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
