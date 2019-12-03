import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Sidebar extends Component {
    state = {
        search: "",
        redirect: false
    }
    searchRef = React.createRef();
    search = () => {

        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });

    }

    render() {

        return (
            <React.Fragment>
                {this.state.redirect === true &&
                    <Redirect to={'/blog/search/' + this.state.search} />
                }
                <aside id="sidebar">
                    {this.props.blog &&
                        <div id="nav-blog" className="sidebar-item">
                            <h4>Acciones</h4>
                            <p>
                                <Link to="/new-article">Crear Artículo</Link>
                            </p>
                        </div>
                    }

                    <div id="search" className="sidebar-item">
                        <h4>Buscador</h4>
                        <form onSubmit={this.search} >
                            <input type="text" name="search" placeholder="¿Qué deseas buscar?" ref={this.searchRef} />
                            <input type="submit" value="Buscar" />
                        </form>
                    </div>
                </aside>
            </React.Fragment>


        );
    }
}

export default Sidebar;