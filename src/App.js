import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import InvItemList from './components/InvItemList';
import InvItemDetail from './components/InvItemDetail';
import Home from './components/Home';
import AddItem from './components/AddItem';

export default function App() {
  return (
    <Router>
      <div>        
        <Route path="/" component={Home} />
        <Route path="/invItemList" component={InvItemList} />
        <Route path="/addItem" component={AddItem} />
        <Route path="/invItemDetail" component={InvItemDetail} />
      </div>
    </Router>
  );
}
