import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import Peter from '../components/about/peter'
import Mehi from '../components/about/mehi'
import Jay from '../components/about/jay'
import Anthonyabout from '../components/about/anthonyAbout'
import Wesley from '../components/about/wesley'
import FrankyDong from '../components/about/frankydong'
import Tanya from '../components/about/tanya'

import Home from '../components/home/home' 
import Login from '../components/navbar/login'
import Post from '../components/navbar/post'
import Listing from '../components/listing/listing'
import MyListings from '../components/navbar/mylistings/myListings';
import Register from '../components/navbar/register'
import ReviewListings from '../components/navbar/mylistings/reviewListings'
import Landing from '../components/landing';
import Messages from '../components/messaging/messages'
import Users from '../components/navbar/mylistings/users';
import Listings from '../components/navbar/mylistings/listings';
import ErrorComponent from '../components/errorComponent';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/search" render={(props) => (
        <Home key={props.location.search} {...props} />)} 
      />
      <Route exact path="/listing/:handle" component={Listing}/>
      <Route exact path="/post" component={Post}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      
      <Route exact path="/mylistings" component={MyListings}/>
      <Route exact path="/reviewlistings" component={ReviewListings}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/listings" component={Listings}/>
      <Route exact path="/messages" component={Messages}/>

      <Route exact path="/about/peter" component={Peter} />
      <Route exact path="/about/jay" component={Jay} />
      <Route exact path="/about/anthony" component={Anthonyabout} />
      <Route exact path="/about/wesley" component={Wesley} />
      <Route exact path="/about/mehi" component={Mehi} />      
      <Route exact path="/about/franky" component={FrankyDong} />        
      <Route exact path="/about/tanya" component={Tanya} />

      <Route exact path="/404" component={ErrorComponent} />
      <Route component={ErrorComponent} />
    </Switch>
  </Router>
)

export default Routes;