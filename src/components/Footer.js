
import React, { Component } from 'react';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: "this is the footer"
        }
    }

    render() {
        return (
            <div>
                <h2> {this.state.msg} </h2>
            </div>
        );
    }
}