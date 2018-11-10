import React, { Component } from 'react'
import { Row, Col, Tabs, Carousel } from 'antd';

import NewsList from './news_list';
import ImageList from './news_image';

import '../../css/news_container.css';

import carousel_1 from '../../image/carousel_1.jpg'
import carousel_2 from '../../image/carousel_2.jpg'
import carousel_3 from '../../image/carousel_3.jpg'
import carousel_4 from '../../image/carousel_4.jpg'


class NewsContainer extends Component {
    render() {
        return (
            <div>
                <Row style={{ height: 16 }}></Row>
                <Row gutter={16}>
                    <Col md={2}></Col>
                    <Col md={10} className="container">
                        <div className='left-container'>
                            <Carousel autoplay dots>
                                <div><img src={carousel_1} alt="carousel_1" /></div>
                                <div><img src={carousel_2} alt="carousel_2" /></div>
                                <div><img src={carousel_3} alt="carousel_3" /></div>
                                <div><img src={carousel_4} alt="carousel_4" /></div>
                            </Carousel>
                        </div>
                    </Col>
                    <Col md={10}>
                        <Tabs className="tabs_news">
                            <Tabs.TabPane tab="新闻" key="1">
                                <NewsList count="8" type="top" />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="娱乐" key="2">
                                <NewsList count="8" type="yule" />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="国际" key="3">
                                <NewsList count="8" type="guoji" />
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                <Row style={{ height: 16 }}></Row>
                <Row>
                    <Col md={2}></Col>
                    <Col md={20}>
                        <ImageList count="6" type="guoji" cardTitle="国际头条"></ImageList>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </div>
        );
    }
}


export default NewsContainer;