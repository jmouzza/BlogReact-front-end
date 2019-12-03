import React, { Component } from 'react';

class ShowMovie extends Component {
    favorita = () => {
        this.props.marcarFav(this.props.movie); //Enviando al componente padre información
    }
    render() {
        /*  Recibiremos por "this.props" objetos con índice "movie" dentro tendrán propiedades (title,image)
            que las asignaremos automáticamente con destructuración y se podrán utilizar en el archivo. */
        var { title, image } = this.props.movie;
        return (

            <article className="article-item">
                <div className="image-wrap">
                    <img src={image} alt="Paisaje" />
                </div>
                <div className="content-article">
                    <h3>{title}</h3>
                    <p>
                        <button onClick={this.favorita}>
                            Favorita
                    </button>
                    </p>
                    <p>
                        <a href="./article.html">Leer más >></a>
                    </p>
                </div>

            </article>


        );
    }
}

export default ShowMovie;