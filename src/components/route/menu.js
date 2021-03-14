import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from '../../Screens/home/Home'
import Error from '../../Screens/errorScreen/error'
import Movie from '../../Screens/movieDetails/movie'
import Player from '../../Screens/player/shakaPlayer';
import Navbar from '../NavBar/navBar'
import Footer from '../footer/footer'

import './menu.css'

const menu = () => {
    return (
        <Router>
           <Navbar/>
            <Switch>
              <Route exact path='/' render={ () =>
                <div>
                  <Home />
                  <Footer />
                </div>
              }/>

              <Route exact path='/movie' render={ () =>
                <div>
                  <Movie />
                  <Footer />
                </div>
              }/>

              <Route exact path='/player' component={Player}/>  
              <Route exact path ='/error' component={Error}/>

          </Switch>
        </Router>
    )
}

export default menu;