import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import ShowArticle from './ShowArticle';
import Global from '../Global';

class Home extends Component {
    state = {
        latest: [],
        status: null
    }

    UNSAFE_componentWillMount() {
        var axios = require('axios');
        axios.get(Global.url + '/last')
            .then(res => {
                this.setState({
                    latest: res.data.ultimos,
                    status: 'success'
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Bienvenido al proyecto con ReactJS"
                    size="slider-big"
                    btn="Ver artículos"
                />
                <div className="center main-container">
                    <section id="content">
                        <h2>ULTIMOS ARTICULOS</h2>
                        {/*Listado de artículos*/}
                        <div id="articles">
                            {(this.state.status === 'success' && JSON.stringify(this.state.latest) !== '[]') ? (
                                this.state.latest.map((article, index) => {
                                    return (
                                        <ShowArticle key={index} article={article} />
                                    );
                                })
                            ) : (
                                    <article className="article-item">
                                        <h3>No hay artículos para mostrar</h3>
                                    </article>
                                )
                            }
                        </div>
                    </section>
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}

export default Home;