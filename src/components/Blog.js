import React, { Component } from 'react';
import Global from '../Global';
import Slider from './Slider';
import Sidebar from './Sidebar';
import ShowArticle from './ShowArticle';

class Blog extends Component {


    state = {
        articles: [],
        status: null
    }

    UNSAFE_componentWillMount() {
        var axios = require('axios');
        axios.get(Global.url + '/articles')
            .then(res => {
                this.setState({
                    articles: res.data.articulos,
                    status: 'success'
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Todos los artículos"
                    size="slider-small"
                />
                <div className="center main-container">
                    <section id="content">

                        {/*Listado de artículos*/}
                        <div id="articles">
                            {(this.state.status === 'success' && JSON.stringify(this.state.articles) !== '[]') ? (
                                this.state.articles.map((article, index) => {
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
                    <Sidebar
                        blog="true"
                    />
                </div>
            </React.Fragment>
        );
    }

}
export default Blog;