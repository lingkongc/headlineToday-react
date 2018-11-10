import React, { Component } from 'react';
import { Row, Col } from 'antd';

import "../../css/pc_footer.css";

class PCFooter extends Component {
    render() {
        let currentDate = new Date();
        return (
            <footer className="footer">
                <Row style={{ height: 16 }}></Row>
                <Row>
                    <Col md={2}></Col>
                    <Col md={20}>
                        <p>&copy;{currentDate.getFullYear()} HeadLine. ALl Rights Reserved.</p>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </footer>
        )
    }
}

export default PCFooter;