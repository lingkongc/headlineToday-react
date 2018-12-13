import React, {Component} from 'react';
import {
    Col,
    Row,
    Tabs,
    Upload,
    Button,
    Icon,
    message,
    List
} from 'antd';

class Usercenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usercollection: ''
        };

    }

    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        }

        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${localStorage.userId}`, myFetchOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    usercollection: result
                })
            })
    }

    render() {
        const props = {
            name: 'file',
            action: 'http://newsapi.gugujiankong.com/handle.ashx',
            headers: {
                authorization: 'authorization-text',
                "Access-Control-Allow-Origin": "*"
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const {usercollection} = this.state;

        return (
            <Row gutter={16}>
                <Col md={2}/>
                <Col md={20}>
                    <Tabs>
                        <Tabs.TabPane tab="收藏列表" key="1">
                            {
                                usercollection.length
                                    ? (
                                        <List
                                            size="large"
                                            bordered
                                            dataSource={usercollection}
                                            renderItem={item => (<List.Item><a
                                                href={`#/article/${item.uniquekey}`}>{item.Title}</a></List.Item>)}
                                        />
                                    )
                                    : '您还没有收藏任何新闻'
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="评论列表" key="2">

                        </Tabs.TabPane>
                        <Tabs.TabPane tab="头像设置" key="3">
                            <div className="clearfix">
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/> Click to Upload
                                    </Button>
                                </Upload>,
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
                <Col md={2}/>
            </Row>
        );
    }
}

export default Usercenter;
