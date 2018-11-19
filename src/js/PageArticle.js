import React, { Component } from 'react';
import { Col, Row } from 'antd';

import Header from './Header.js';
import Footer from './Footer';


class PageArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        };

        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    newsItem: json
                });
                document.title = this.state.newsItem.title + 'React News | React 驱动的新闻平台';
            })


    }

    render() {
        return (
            <div>
                <Header />
                <Row>
                    <Col md={2}></Col>
                    <Col md={14}>
                        <div className="article" dangerouslySetInnerHTML={{ __html: this.state.newsItem.pagecontent }}></div>
                    </Col>
                    <Col md={6}></Col>
                    <Col md={2}></Col>
                </Row>
                <Footer />
            </div>
        )
    }
}


export default PageArticle;