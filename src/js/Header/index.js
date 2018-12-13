import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Col,
    Row,
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Modal
} from 'antd';

import './style.css';

import logo from '../../image/news_logo.svg';

const PATH_BASE = 'http://newsapi.gugujiankong.com/Handler.ashx';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 导航当前
            current: 'menu-top',
            // 模态框是否可见
            modalVisble: false,
            // 登录还是注册
            action: 'login',
            // 是否已经登录
            hasLogined: false,
            // 用户名
            userNickName: null,
            // 用户ID
            userId: 0
        }

        // 设置模态框 是否可见
        this.setModalVisible = this.setModalVisible.bind(this);
        // 处理表单提交
        this.handleSubmit = this.handleSubmit.bind(this);
        // 处理点击导航
        this.handleClick = this.handleClick.bind(this);
        // 切换登录和注册
        this.switchCard = this.switchCard.bind(this);
        // 退出登录
        this.logout = this.logout.bind(this);
    }

    // 声明周期方法，加载组件前执行
    componentWillMount() {
        if (!localStorage.userId) return;
        this.setState({
            hasLogined: true,
            userNickName: localStorage.userNickName,
            userId: localStorage.userId
        })
    }

    // 设置模态框
    setModalVisible(xxx) {
        this.setState({
            modalVisble: xxx
        });
    }

    // 提交表单
    handleSubmit(event) {
        // 页面提交
        event.preventDefault();
        const myFetchOptions = {
            method: 'GET'
        };
        const formData = this.props.form.getFieldsValue();
        fetch(`${PATH_BASE}?action=${this.state.action}&username=${formData.userName}&password=${formData.password}&r_userName=${formData.r_userName}&r_password=${formData.r_password}&r_confirmPassword=${formData.r_confirmPassword}`, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userNickName: json.NickUserName,
                    userId: json.UserId
                })
                localStorage.userId = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        if (this.state.action == 'login') {
            this.setState({
                hasLogined: true
            })
        }
        message.success('请求成功');
        this.setModalVisible(false);
    }

    // 处理点击导航
    handleClick(event) {
        console.log('click ', event)
        if (event.key == 'register') {
            this.setState({
                current: 'register'
            });
            this.setModalVisible(true);
        } else {
            this.setState({
                current: event.key
            });
        }
    }

    switchCard(key) {
        if (key == 1) {
            this.setState({
                action: 'login'
            })
        } else if (key == 2) {
            this.setState({
                action: 'register'
            })
        }
    }

    // 退出登录
    logout() {
        localStorage.userId = '';
        localStorage.userNickName = '';
        this.setState({
            hasLogined: false
        })
    }

    render() {
        // getFieldDecorator用于表单的双向绑定
        const {getFieldDecorator} = this.props.form;
        const {
            current,
            modalVisble,
            action,
            hasLogined,
            userNickName,
            userId
        } = this.state;
        return (
            <header className="header">
                <Row gutter={16}>
                    <Col md={2}/>
                    <Col md={6} sm={10}>
                        <a href="/" className="header__logo">
                            <img className="header__img" src={logo} alt="logo"/>
                            <span className="header__span">HeadLine</span>
                        </a>
                    </Col>
                    <Col md={14} sm={10}>
                        <Menu
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[current]}
                        >
                            <Menu.Item key="menu-top">
                                <Icon type="paper-clip"/>头条
                            </Menu.Item>
                            <Menu.Item key="menu-shehui">
                                <Icon type="paper-clip"/>社会
                            </Menu.Item>
                            {
                                hasLogined
                                    ? <Menu.Item key="login" className="register">
                                        <Button type="primary" htmlType="button">
                                            {userNickName}
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>
                                            <Link to="/usercenter">
                                                <Button type="dashed" htmlType="button">个人中心</Button>
                                            </Link>
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button type="ghost" htmlType="button" onClick={this.logout}>
                                            退出账户
                                        </Button>
                                    </Menu.Item>
                                    : <Menu.Item key="register" className="register">
                                        <Icon type="appstore"/>注册/登录
                                    </Menu.Item>
                            }
                        </Menu>
                        {/* 模态框 */}
                        <Modal
                            title="用户中心"
                            wrapClassName="vertical-center"
                            visible={modalVisble}
                            onCancel={() => this.setModalVisible(false)}
                            onOK={() => this.setModalVisible(false)}
                            okText="确定"
                            cancelText="取消"
                            destroyOnClose={true}
                        >
                            <Tabs type="card" onChange={this.switchCard}>
                                <Tabs.TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Item>
                                            {getFieldDecorator("userName", {
                                                rules: [{required: true, message: '请输入您的账户名'}]
                                            })(
                                                < Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="账户名"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator("password", {
                                                rules: [{required: true, message: '请输入您的密码'}]
                                            })(
                                                < Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        type="password"
                                                        placeholder="密码"/>
                                            )}
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Item>
                                            {getFieldDecorator("r_userName", {
                                                rules: [{required: true, message: '请输入您的账户名'}]
                                            })(
                                                < Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="账户名"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator("r_password", {
                                                rules: [{required: true, message: '请输入您的密码'}]
                                            })(
                                                < Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        type="password"
                                                        placeholder="密码"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator("r_confirmPassword", {
                                                rules: [{required: true, message: '请再次输入您的密码'}]
                                            })(
                                                < Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        type="password"
                                                        placeholder="确认密码"/>
                                            )}
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </Tabs.TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col md={2}/>
                </Row>
            </header>
        );
    }
}

Index = Form.create()(Index);
export default Index;