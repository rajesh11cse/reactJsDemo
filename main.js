import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Home from './home.jsx';
import Message from './message.jsx';
import Http from './https.jsx';
import About from './about.jsx';
import Contact from './contact.jsx';
import NotFound from './pageNotFound.jsx';
import {Router, Route, IndexRoute, hashHistory } from 'react-router';


   ReactDOM.render((
   <Router history = {hashHistory}>
      <Route path = "/" component = {App}>
         {/*<IndexRoute component = {Home} />*/}
         {/*<Route path = "/" component = {App}/>*/}
         <Route path = "/home" component = {Home} />
         <Route path = "/message" component = {Message} />
         <Route path = "/http" component = {Http} />
         <Route path = "/about" component = {About} />
         <Route path = "/contact" component = {Contact} />
          <Route path='*' component={NotFound} />
      </Route>
   </Router>
	
), document.getElementById('app'))