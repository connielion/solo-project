import React, { Component } from "react";
import '../src/styling/styles.css';
// import react router
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import child components 
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Pokemons from './components/Pokemons';
import Favs from './components/Favs';

class App extends Component {

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">
                        <img className="logo" src="https://www.trzcacak.rs/myfile/full/39-397461_pokemon-ball-png-transparent-background-pokeball-png.png" alt="logo" />
                        DexApp</a>
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link to={'/'} className="nav-link"> Home <i className="fas fa-home"></i> |</Link>
                        </li>
                        <li>
                            <Link to={'/register'} className="nav-link"> Register <i className="fas fa-edit"></i> |</Link>
                        </li>
                        <li>
                            <Link to={'/login'} className="nav-link"> Login <i className="fas fa-sign-in-alt"></i> |</Link>
                        </li>
                        <li>
                            <Link to={'/pokemons'} className="nav-link"> Search Pokemons <i className="fas fa-search"></i></Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/pokemons' component={Pokemons} />
                    <Route path='/favs' component={Favs} />
                </Switch>
            </Router >
        )
    }
};

export default App;