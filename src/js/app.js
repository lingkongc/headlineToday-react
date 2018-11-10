import React, { Component } from "react";

import PCHeader from './components/pc_header.js';
import PCFooter from './components/pc_footer.js';
import NewsContainer from './components/news_container';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <PCHeader />
        <NewsContainer />
        <PCFooter />
      </div>
    );
  }
}

export default App;
