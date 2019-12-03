import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Global from '../Global';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

class NewArticle extends Component {

    state = {
        id: "",
        status: null,
        article: {},
        selectedFile: null
    }

    UNSAFE_componentWillMount() {
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            locale: 'en',
            messages: {
                required: 'Campo obligatorio, debes completarlo',
                alpha_num_dash_space: 'Sólo se admiten: Letras números y guiones'

            }
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
        axios.post(Global.url + '/save', {
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
                    swal("Artículo creado ", "El artículo ha sido creado", "success");

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
        return (
            <React.Fragment>
                {this.state.status === 'success' &&
                    <Redirect to={'/blog'} />
                }
                <Slider
                    title="Crear Artículo"
                    size="slider-small"
                />
                <div className="center main-container">
                    <section id="content">
                        <h2>Nuevo Artículo</h2>
                        <form action="" className="mid-form" onSubmit={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" placeholder="Título del artículo" ref={this.titleRef} />
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_dash_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" id="" cols="30" rows="10" placeholder="Contenido del artículo" ref={this.contentRef} ></textarea>
                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_dash_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Imagen</label>
                                <input type="file" name="image" placeholder="Imagen del artículo" onChange={this.fileChange} />
                            </div>
                            <input type="submit" value="Crear" />
                        </form>
                    </section>
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}
export default NewArticle;