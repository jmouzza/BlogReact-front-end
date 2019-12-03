import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="clearfix-before-footer" className="clearfix"></div>
                <footer id="footer">
                    <div className="center">
                        &copy; Frameworks para JS 2019
                    </div>
                </footer>
            </React.Fragment>

        );
    }
}
export default Footer;