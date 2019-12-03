import React, { Component } from 'react';
/*Importando clases del paquete React Router DOM*/
import { BrowserRouter, Route, Switch } from 'react-router-dom';
/*Importando componentes que usará el Router*/
import Header from './components/Header';
import Pelicula from './components/Pelicula';
import Home from './components/Home';
import Blog from './components/Blog';
import OneArticle from './components/OneArticle';
import Search from './components/Search';
import NewArticle from './components/NewArticle';
import EditArticle from './components/EditArticle';
import Formulario from './components/Formulario';
import Error from './components/Error';
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />

                {/*Dentro de switch se hará la magia SPA con la configuracion de las rutas*/}
                <Switch>
                    {/*Configuración de Rutas con componentes asociados*/}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/article/:id" component={OneArticle} />
                    <Route exact path="/blog/search/:search" component={Search} />
                    <Route exact path="/new-article" component={NewArticle} />
                    <Route exact path="/edit-article/:id" component={EditArticle} />
                    <Route exact path="/formulario" component={Formulario} />
                    <Route exact path="/pelicula/:name?" component={Pelicula} />
                    {/*Configuración Ruta 404*/}
                    <Route component={Error} />
                </Switch>


            </BrowserRouter>
        );
    }
}
export default Router;