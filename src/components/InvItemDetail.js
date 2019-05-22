import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class InvItemDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemId: '',
            name: '',
            description: '',
            quantity: '',
            image: '',
            pageNum: '',
            appMassage: false
        }
    }

    componentDidMount() {
        let itemNum = '';
        if ((this.props.location.state) && (this.state.itemId !== this.props.location.state.itemId)) {
            this.setState({
                itemId: this.props.location.state.itemId,
                pageNum: parseInt(this.props.location.state.pageNum)
            });
            itemNum = this.props.location.state.itemId;
        } else {
            itemNum = this.state.itemId;
        }

        if (itemNum) {
            axios.get('http://127.0.0.1:8000/items/' + itemNum)
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        description: response.data.description,
                        image: response.data.image,
                        quantity: response.data.quantity
                    });
                }).catch(function (error) {
                    console.log(error);
                })
        }
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeImageUrl = (e) => {
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
        axios.put(`http://localhost:8000/items/${this.state.itemId}/`, obj)
            .then(res => {
                this.navigateToItemList();
            }).catch(err => {
                this.displayMessage();
                console.log(err)
            });
    }

    displayMessage = () => {
        this.setState({
            appMassage: true
        })
    }

    navigateToItemList = () => {
        let path = {
            pathname: '/invItemList',
            state: {
                pageNum: this.state.pageNum
            }
        }
        this.props.history.push(path);
    }

    handleCancelClick = (e) => {
        e.preventDefault();
        this.navigateToItemList();
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 10, width: '40%' }}>
                    <h6 align="left">Update Item</h6>{this.state.appMassage && (<label> Please input values.</label>)} 
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Item Name:  </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                readOnly />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image Url: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.image}
                                onChange={this.onChangeImageUrl}
                            />
                        </div>
                        <div className="form-group">
                            <label>quantity: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary ml-1" value="Save" />
                            <input type="button" className="btn btn-primary ml-1" onClick={this.handleCancelClick} value="Cancel" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}