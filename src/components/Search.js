import React, { Component } from 'react';
import Global from '../Global';
import Slider from './Slider';
import Sidebar from './Sidebar';
import ShowArticle from './ShowArticle';

class Search extends Component {


    state = {
        search: null,
        articles: [],
        coincidencias: 0,
        status: null
    }

    UNSAFE_componentWillMount() {
        var search = (this.props.match.params.search);
        this.setState({
            search: search
        });
        var axios = require('axios');
        axios.get(Global.url + '/search/' + search)
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    coincidencias: res.data.coincidencias,
                    status: 'success'
                })
                console.log(res);
            });


    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    title={'Búsqueda de: ' + this.state.search}
                    size="slider-small"
                />
                <div className="center main-container">
                    <section id="content">

                        {/*Listado de artículos*/}
                        {this.state.coincidencias > 0 ? (
                            <div id="articles">
                                {this.state.coincidencias === 1 ? (
                                    <h2>Sólo se encontro un artículo</h2>
                                ) : (
                                        <h2>Artículos encontrados: {this.state.coincidencias}</h2>
                                    )}

                                {this.state.status === 'success' ? (
                                    this.state.articles.map((article, index) => {
                                        return (
                                            <ShowArticle key={index} article={article} />
                                        );
                                    })
                                ) : (
                                        <article class="article-item">
                                            <h3>Cargando página...</h3>
                                        </article>
                                    )
                                }
                            </div>
                        ) : (
                                <div id="articles">
                                    <h2>No se encontraron artículos</h2>
                                </div>
                            )
                        }

                    </section>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </React.Fragment>
        );
    }

}
export default Search;