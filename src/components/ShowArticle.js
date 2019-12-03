import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image_default from '../assets/images/default_image.png';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';

class ShowArticle extends Component {

    render() {
        /*  Recibiremos por "this.props" objetos con índice "article" dentro tendrán propiedades del artículo
            que las asignaremos automáticamente con destructuración y se podrán utilizar en el archivo. */
        var { _id, date, title, content, image } = this.props.article;

        return (
            <article className="article-item">
                <div className="image-wrap">
                    {image !== null ? (
                        <img src={Global.url + '/get-image/' + image} alt="Paisaje" />
                    ) : (
                            <img src={image_default} alt="Paisaje" />
                        )}
                </div>
                <div className="content-article">
                    <h3>{title}</h3>
                    <span><Moment fromNow>{date}</Moment></span>
                    <p>
                        {content.substr(0, 70)}...
                        <Link to={'/blog/article/' + _id}> Leer</Link>
                    </p>
                </div>
            </article >
        );
    }
}
export default ShowArticle;