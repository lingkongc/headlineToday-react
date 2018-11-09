import React, { Component } from 'react';
import { Col, Row, Menu, Icon, Tabs, message, Form, Input, Butto, Checkbox, Modal } from 'antd';

import '../../css/pc_header.css';

import logo from '../../image/news_logo.svg';
import { COPYFILE_FICLONE_FORCE } from 'constants';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class PCHeader extends Component {
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

        this.setModalVisible = this.setModalVisible.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // 设置模态框
    setModalVisible(flag) {
        this.setState({
            modalVisble: flag
        });
    }

    // 提交表单
    handleSubmit(event) {
        // 页面提交

    }

    // 处理点击导航
    handleClick(event) {
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

    render() {
        const { getFieldProps } = this.props.form;
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
                    <Col md={2} />
                    <Col md={6} sm={10}>
                        <a href="/" className="header__logo">
                            <img className="header__img" src={logo} alt="logo" />
                            <span className="header__span">HeadLine</span>
                        </a>
                    </Col>
                    <Col md={14} sm={10}>
                        <Menu
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                        >
                            <Menu.Item key="menu-top">
                                <Icon type="paper-clip" />头条
                            </Menu.Item>
                            <Menu.Item key="menu-shehui">
                                <Icon type="paper-clip" />社会
                            </Menu.Item>
                            <Menu.Item key="menu-guonei">
                                <Icon type="paper-clip" />国内
                            </Menu.Item>
                            <Menu.Item key="menu-guoji">
                                <Icon type="paper-clip" />国际
                            </Menu.Item>
                            <Menu.Item key="menu-yule">
                                <Icon type="paper-clip" />娱乐
                            </Menu.Item>
                            <Menu.Item key="menu-tiyu">
                                <Icon type="paper-clip" />体育
                            </Menu.Item>
                            {
                                hasLogined
                                    ? <Menu.Item key="logout" className="register">
                                        <Button type="primary" htmlType="button">
                                            {userNickName}
                                        </Button>
                                        <Link target="_blank">
                                            <Button type="dashed" htmlType="button">
                                                个人中心
                                            </Button>
                                        </Link>
                                        <Button type="ghost" htmlType="button">
                                            退出账户
                                        </Button>
                                    </Menu.Item>
                                    : <Menu.Item key="regester" className="register">
                                        <Icon type="appstore" />注册/登录
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
                            okText="关闭"
                        >
                            <Tabs type="card">
                                <TabPane Tab="注册" key="2">
                                    <Form horizontal onSubmit={this.handleSubmit}>
                                        <FormItem label="账户">
                                            <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                                        </FormItem>
                                        <FormItem label="密码">
                                            <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')} />
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')} />
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col md={2} />
                </Row>
            </header>
        );
    }
}

export default PCHeader;