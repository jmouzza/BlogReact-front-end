import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Slider extends Component {
    render() {
        return (
            <div id="slider" className={this.props.size}>
                <h2>{this.props.title}</h2>
                {this.props.btn &&
                    <NavLink to="/blog" className="btn-white">{this.props.btn}</NavLink>
                }
            </div>
        );
    }
}
export default Slider;