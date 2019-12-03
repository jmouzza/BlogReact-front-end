import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Slider from './Slider';

class Formulario extends Component {
    state = {
        user: {}
    }

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    bioRef = React.createRef();
    emailRef = React.createRef();
    passwordRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    recibirFormulario = (e) => {
        e.preventDefault();
        if (this.generoHombreRef.current.checked) {
            this.genero = this.generoHombreRef.current.value;
        } else if (this.generoMujerRef.current.checked) {
            this.genero = this.generoMujerRef.current.value;
        } else {
            this.genero = this.generoOtroRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            genero: this.genero,
            bio: this.bioRef.current.value,
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value
        };

        this.setState({
            user: user
        });
    }

    render() {
        return (

            <React.Fragment>
                <Slider
                    title="Completa el Formulario"
                    size="slider-small"
                />
                <div className="center main-container">
                    <section id="content">
                        {JSON.stringify(this.state.user) !== '{}' &&
                            <div className="datos-form">
                                <h2>Datos recibidos por el formulario</h2>
                                <p>Nombre y Apellido: {this.state.user.nombre.toUpperCase() + " " + this.state.user.apellido.toUpperCase()}</p>
                                <p>Biografía: {this.state.user.bio}</p>
                                <p>Género: {this.state.user.genero}</p>
                                <p>Contacto (email): {this.state.user.email}</p>
                            </div>
                        }
                        <h2>Formulario</h2>
                        <form action="" className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <input type="text" name="name" placeholder="Nombre" ref={this.nombreRef} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="surname" placeholder="Apellidos" ref={this.apellidoRef} />
                            </div>
                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} defaultChecked />Hombre&nbsp;
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} />Mujer&nbsp;
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} />Otro&nbsp;
                            </div>
                            <div className="form-group">
                                <textarea name="bio" placeholder="Biografía" ref={this.bioRef} ></textarea>
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Email" ref={this.emailRef} />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" placeholder="Contraseña" ref={this.passwordRef} />
                            </div>
                            <input type="submit" value="Registrar" />
                        </form>
                    </section>
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}
export default Formulario;