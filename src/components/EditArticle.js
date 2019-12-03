import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Global from '../Global';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

class EditArticle extends Component {
    /*
    1. Recoger el id del articulo recibido por la url
    2. Crear un método para sacar el objeto del backend
    3. Repoblar / Rellenar el formulario
    4. Actualizar el objeto en el backend
    */
    state = {
        id: "",
        status: null,
        article: {},
        selectedFile: null,
    }

    UNSAFE_componentWillMount() {
        //Sacar id del articulo.
        var id = (this.props.match.params.id);
        this.getArticle(id);

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            locale: 'en',
            messages: {
                required: 'Campo obligatorio, debes completarlo',
                alpha_num_dash_space: 'Sólo se admiten: Letras números y guiones'

            }
        });
    }
    getArticle(id) {
        var axios = require('axios');
        axios.get(Global.url + '/article/' + id)
            .then((res) => {
                this.setState({
                    article: res.data.articulo,
                    status: 'ready',
                    id: id
                });

            });
    }

    titleRef = React.createRef();
    contentRef = React.createRef();
    imageRef = React.createRef();

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    recibirFormulario = (e) => {
        e.preventDefault();
        //rellenar el state con formulario
        var title = this.titleRef.current.value;
        var content = this.contentRef.current.value;
        var axios = require('axios');
        axios.put(Global.url + '/update/' + this.state.id, {
            title: title,
            content: content
        })
            .then(res => {
                if (res.data.article) {
                    this.setState({
                        id: res.data.article._id,
                        article: res.data.article,
                        status: 'waiting'
                    });
                    swal("Artículo actualizado ", "El artículo ha sido actualizado", "success");

                    if (this.state.selectedFile !== undefined && this.state.selectedFile !== null) {
                        //1. Sacar id del artículo que acabamos de crear
                        var articleId = this.state.id;

                        //2. Crear un Form Data y añadir fichero
                        const formData = new FormData();
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );
                        //3.Petición ajax
                        axios.post(Global.url + '/upload-image/' + articleId, formData)
                            .then(res => {
                                if (res.data.articulo_updated) {
                                    this.setState({
                                        article: res.data.articulo_updated,
                                        status: 'success'
                                    });
                                } else { // error al subir imagen
                                    this.setState({
                                        status: 'failing'
                                    });
                                }
                            })
                    } else { // se sube un artículo sin imagen
                        this.setState({
                            status: 'success'
                        });
                    }
                }
            })
    }

    render() {
        if (this.state.status === 'ready' || this.state.status === 'success') {
            return (
                <React.Fragment>
                    {this.state.status === 'success' &&
                        <Redirect to={'/blog'} />
                    }
                    <Slider
                        title="Editar Artículo"
                        size="slider-small"
                    />
                    <div className="center main-container">
                        <section id="content">
                            <h2>Editar Artículo</h2>
                            <form action="" className="mid-form" onSubmit={this.recibirFormulario}>
                                <div className="form-group">
                                    <label htmlFor="title">Título</label>
                                    <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} />
                                    {this.validator.message('title', this.state.article.title, 'required|alpha_num_dash_space')}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Contenido</label>
                                    <textarea name="content" id="" cols="30" rows="10" defaultValue={this.state.article.content} ref={this.contentRef} ></textarea>
                                    {this.validator.message('content', this.state.article.content, 'required|alpha_num_dash_space')}
                                </div>
                                <div className="form-group">
                                    <img src={Global.url + '/get-image/' + this.state.article.image} alt="Paisaje" />
                                    <label htmlFor="image">Elegir otra imagen</label>
                                    <input type="file" name="image" placeholder="Imagen del artículo" onChange={this.fileChange} />
                                </div>
                                <input type="submit" value="Actualizar" />
                            </form>
                        </section>
                        <Sidebar />
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <h2>HOLA</h2>
            )
        }

    }
}
export default EditArticle;