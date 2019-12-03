import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from './Slider';

class Latest extends Component {
    render() {

        return (
            <React.Fragment>
                <Slider />
                <section id="content">
                    <h2>ULTIMOS ARTICULOS</h2>
                    {/*Listado de artículos*/}
                    <div id="articles">
                        <article id="article-template" class="article-item">
                            <div class="image-wrap">
                                <img src="https://concepto.de/wp-content/uploads/2015/03/paisaje-2-e1549600987975.jpg" alt="Paisaje" />
                            </div>
                            <h3>Artículo de prueba</h3>
                            <span>
                                Hace 5 minutos
                        </span>
                            <p>
                                <NavLink to="/pizza">Leer más >></NavLink>
                            </p>
                        </article>
                        {/*Añadiendo artículos de prueba con JS*/}
                    </div>
                </section>
            </React.Fragment>

        );
    }
}

export default Latest;