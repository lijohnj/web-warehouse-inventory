import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemId: '',
            name: '',
            description: '',
            quantity: '',
            image: 'http://'
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    onChangeQuantity = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            quantity: this.state.quantity
        };

        axios.post(`http://127.0.0.1:8000/items/`, obj)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/invItemList');
            }).catch(err => {
                this.displayMessage();
                console.log(err.response)
            });

    }

    displayMessage = () => {
        this.setState({
            appMassage: true
        })
    }

    handleCancelClick = (e) => {
        if (e) e.preventDefault();
        this.props.history.push("/home");
    }

    render() {
        const { name, description, image, quantity } = this.state;
        return (
            <div>
                <div style={{ marginTop: 10, width: '40%' }}>
                    <h6 align="left">Create Item</h6>{this.state.appMassage && (<label> Please input values.</label>)}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Item Name:  </label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                className="form-control"
                                value={description}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>image Url: </label>
                            <input type="text"
                                className="form-control"
                                value={image}
                                onChange={this.onChangeImage}
                            />
                        </div>
                        <div className="form-group">
                            <label>quantity: </label>
                            <input type="text"
                                className="form-control"
                                value={quantity}
                                onChange={this.onChangeQuantity}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary ml-1" value="Create Item" />
                            <input type="button" className="btn btn-primary ml-1" onClick={this.handleCancelClick} value="Cancel" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}