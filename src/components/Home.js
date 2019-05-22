
import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Welcome to Warehouse Inventory",
      title: "Home"
    }
  }

  render() {
    return (
      <div>
        <h2> {this.state.msg} </h2>
        <br />
        <ul>
          <li>
            <Link to="/invItemList">List Item</Link>
          </li>
          <li>
            <Link to="/addItem">Add Item</Link>
          </li>
        </ul>
      </div>
    );
  }
}