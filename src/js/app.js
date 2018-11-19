import React, { Component } from "react";

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import NewsContainer from './ContentIndex';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NewsContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
