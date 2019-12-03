import React, { Component } from 'react';
import logo from '../assets/images/react.png';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    <div id="logo-responsive">
                        {/*LOGO*/}

                        <div id="logo">
                            <img src={logo} alt="Logotipo" />
                            <NavLink to="/">
                                <span id="brand"><strong>Curso</strong>React</span>

                            </NavLink>
                        </div>

                    </div>
                    {/*MENU*/}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog" activeClassName="active">Artículos</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formulario" activeClassName="active">Formulario</NavLink>
                            </li>
                            <li>
                                <NavLink to="/pelicula" activeClassName="active">Películas</NavLink>
                            </li>

                        </ul>
                    </nav>
                    <div className="clearfix"></div>
                </div>
            </header >
        );
    }

}

export default Header;