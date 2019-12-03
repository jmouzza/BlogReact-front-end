import React, { Component } from 'react';
import ShowMovie from './ShowMovie';
import Sidebar from './Sidebar';
import Slider from './Slider';


class Pelicula extends Component {
    state = {
        peliculas: [
            { title: 'Batman', image: 'https://dam.smashmexico.com.mx/wp-content/uploads/2018/07/09202029/the-dark-knight-10-anios-cover.jpg' },
            { title: 'Montecristo', image: 'http://es.web.img3.acsta.net/r_1280_720/medias/nmedia/00/02/43/26/cristo3.jpg' },
            { title: 'Toy Story', image: 'https://http2.mlstatic.com/munecos-amigos-interactivos-toy-story-woody-buzz-mundomanias-D_NQ_NP_809457-MLA31255927615_072019-F.jpg' }
        ],
        favorita: {}
    }

    favorita = (pelicula) => {
        this.setState({
            favorita: pelicula
        });

    }
    componentDidUpdate() {
        console.log(this.state.favorita);
    }

    render() {
        var name = (this.props.match.params.name);

        return (
            <React.Fragment>
                <Slider
                    title="Películas favoritas"
                    size="slider-small"
                />
                <div className="center main-container">
                    <section id="content">
                        {name &&
                            <h1>Selección de películas para: {name}</h1>
                        }
                        {this.state.favorita.title ? (
                            <h2>Favorita: {this.state.favorita.title}</h2>
                        ) : (
                                <h2>No has elegido película favorita</h2>
                            )
                        }
                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, index) => {
                                    return (
                                        <ShowMovie key={index} movie={pelicula} marcarFav={this.favorita} />
                                    );
                                })
                            }
                        </div>

                    </section>
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}

export default Pelicula;