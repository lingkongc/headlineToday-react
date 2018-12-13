import React, {Component} from 'react';

import Comments from '../comments/comments'

import {Col, Row, BackTop} from 'antd';
import './style.css';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsItem: ''
        }

        // 写入文章
        this.createMarkup = this.createMarkup.bind(this);
    }

    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        };

        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.match.params.uniquekey}`, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    newsItem: json
                });
                document.title = this.state.newsItem.title + 'React News | React 驱动的新闻平台';
            });
    }

    createMarkup() {
        return {
            __html: this.state.newsItem.pagecontent
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={2}/>
                    <Col md={14}>
                        <div className="article"
                             dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <Comments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col md={6}></Col>
                    <Col md={2}/>
                </Row>
                <BackTop/>
            </div>
        )
    }
}


export default Detail;