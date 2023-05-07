import React from 'react';
import CommentForm from './CommentForm';
import LoginForm from './LoginForm';
import MovieContainer from './MovieContainer';
import SignupForm from './SignupForm';
import UserAccountInfo from './UserAccountInfo';
/* import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Services from './Services';
import Account from './Account';
import Login from './Login';
 */
const HomePage = () => {
  return (
    <div className='subpixel-antialiased'>
      <LoginForm/>
      <SignupForm/>
      <CommentForm/>
      {/* <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router> */}
      <MovieContainer />
      {/* <UserAccountInfo/> */}
    </div>
  );
};

export default HomePage;
