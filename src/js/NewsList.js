import React, {Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: ''
        }
    }

    componentWillMount() {
        const myFetchOptions = {
            method: 'GET'
        };
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
                news: json
            }))
    }


    render() {
        const {news} = this.state;
        return (
            <div className="topNewsList">
                <Card>
                    <ul>
                        {
                            news.length
                                ? news.map((newsItem, index) =>
                                    <li key={index}>
                                        <Link to={`article/${newsItem.uniquekey}`} target="_blank">
                                            {newsItem.title}
                                        </Link>
                                    </li>
                                )
                                : '没有加载到数据'
                        }
                    </ul>
                </Card>
            </div>
        );
    }
}

export default NewsList;
