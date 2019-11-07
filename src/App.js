import React, { Component } from "react";
import '../src/styling/styles.css';
// import react router
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import child components 
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Pokemons from './components/Pokemons';

class App extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">SOLO</a>
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link to={'/'} className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to={'/register'} className="nav-link"> Register</Link>
                        </li>
                        <li>
                            <Link to={'/login'} className="nav-link"> Login</Link>
                        </li>
                        <li>
                            <Link to={'/pokemons'} className="nav-link"> Your Pokemons</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/pokemons' component={Pokemons} />
                </Switch>

            </Router >
        )
    }
};

export default App;