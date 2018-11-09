import React, { Component } from "react";

import PCHeader from './components/pc_header.js';
import PCFooter from './components/pc_footer.js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <PCHeader />
        <PCFooter />
      </div>
    );
  }
}

export default App;
