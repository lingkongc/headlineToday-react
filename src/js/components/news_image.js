import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';

const styleImage = {
    display: "block",
    width: "100%"
}

const styleH3 = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
}

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: ''
        }
    }
    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
                news: json
            }))
    }


    render() {
        const { news } = this.state;
        return (
            <div className="topNewsList">
                <Card
                    title={this.props.cardTitle}
                    bordered={true}
                    style={{ width: this.props.width }}
                >
                    <Row gutter={16}>
                        {
                            news.length
                                ? news.map((newsItem, index) =>
                                    <Col md={4} key={index} className="image-list">
                                        <div className="custom-iamge">
                                            <img src={newsItem.thumbnail_pic_s} alt="" style={styleImage} />
                                        </div>
                                        <div className="custom-card">
                                            <h3 style={styleH3}>{newsItem.title}</h3>
                                            <p>{newsItem.author_name}</p>
                                        </div>
                                    </Col>
                                )
                                : '没有加载到数据'
                        }
                    </Row>
                </Card>
            </div>
        );
    }
}

export default ImageList;
