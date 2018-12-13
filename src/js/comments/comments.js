import React, {Component} from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Button,
    Card,
    notification
} from 'antd';
import {Link} from 'react-router-dom';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addUserCollection = this.addUserCollection.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const myFetchOptions = {
            method: 'GET'
        }
        const formdata = this.props.form.getFieldsValue();
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${localStorage.userId}&uniquekey=${this.props.uniquekey}&commnet=${formdata.remark}`, myFetchOptions)
            .then(response => response.json())
            .then(result => {
                this.componentDidMount();
            });
    };

    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        };

        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${this.props.uniquekey}`, myFetchOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    comments: result
                });
            });
    }

    addUserCollection() {
        const myFetchOptions = {
            method: 'GET'
        };
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${localStorage.userId}&uniquekey=${this.props.uniquekey}`, myFetchOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
                }
            });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        return (
            <div className='comment'>
                <Row>
                    <Col span={24}>
                        {
                            // 过滤出最新的10条评论，将数组反转，最新添加的评论放在最前面
                            comments.length
                                ?
                                comments.filter((item, index, arr) => {
                                    return index >= arr.length - 10
                                }).reverse().map((item, index) => (
                                    <Card key={index} title={item.UserName}
                                          extra={<a href="#">发布于{item.datetime}</a>}>
                                        <p>{item.Comments}</p>
                                    </Card>
                                ))
                                : '没有加载到内容'
                        }
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="您的评论">
                                {getFieldDecorator('remark', {
                                    rules: [{required: true, message: '请输入评论'}],
                                })(
                                    <Input type="text" placeholder="Password"/>
                                )}
                            </Form.Item>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addUserCollection}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Comments = Form.create({})(Comments);
