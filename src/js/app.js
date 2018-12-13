import React, {Component} from "react";
import {HashRouter, Route} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import ContentIndex from './ContentIndex';
import Detail from './Detail';
import Usercneter from './Usercenter'


class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={ContentIndex}/>
                    <Route path="/article/:uniquekey" component={Detail}/>
                    <Route path="/usercenter" component={Usercneter}/>
                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}

export default App;
