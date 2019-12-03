import React, { Component } from 'react';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import image_default from '../assets/images/default_image.png';
import Sidebar from './Sidebar';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class OneArticle extends Component {
    state = {
        article: [],
        status: null,
        redirect: false,
        id: null
    }

    UNSAFE_componentWillMount() {
        var id = (this.props.match.params.id);

        var axios = require('axios');
        axios.get(Global.url + '/article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.articulo,
                    status: 'success'
                });

            });

    }
    deleteArticle = (id) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado no podrás recuperar tu artículo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Artículo eliminado", "El artículo ha sido eliminado correctamente", "success");
                    var axios = require('axios');
                    axios.delete(Global.url + '/delete/' + id)
                        .then(res => {
                            this.setState({
                                status: 'deleted'
                            });
                        });
                } else {
                    swal("¡¡¡Salvaste tu artículo!!! =)");
                }

            });
    }

    editArticle(id) {
        this.setState({
            redirect: true,
            id: id
        });
    }
    render() {

        if (this.state.status === 'deleted') {
            return (<Redirect to={'/blog'} />);
        }

        var { _id, date, title, content, image } = this.state.article;

        return (
            <div className="center main-contaier">
                <section id="content">
                    <article className="onearticle">
                        <div className="onearticle-image">
                            {image !== null ? (
                                <img src={Global.url + '/get-image/' + image} alt="Paisaje" />
                            ) : (
                                    <img src={image_default} alt="Paisaje" />
                                )}
                        </div>
                        <div className="onearticle-content">
                            <h3 className="onearticle-title">{title}</h3>
                            <span><Moment fromNow>{date}</Moment></span>
                            <p>{content}</p>
                            <button className="delete-article" onClick={() => { this.deleteArticle(_id) }}>Eliminar</button>
                            <button className="edit-article" onClick={() => { this.editArticle(_id) }}>Editar</button>
                            {this.state.redirect === true &&
                                <Redirect to={'/edit-article/' + _id} />
                            }
                        </div>
                    </article>
                </section>
                <Sidebar />
            </div>

        );
    }
}
export default OneArticle;