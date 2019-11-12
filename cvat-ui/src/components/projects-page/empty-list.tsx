import React from 'react';

import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import {
    Col,
    Row,
    Icon,
} from 'antd';

export default function NoProjectsComponent() {
    const noProjectsIcon = () => (<img src='/assets/no-projects.svg'/>);

    return (
        <div className='cvat-no-projects-page'>
            <Row type='flex' justify='center' align='middle'>
                <Col>
                    <Icon className='cvat-no-projects-icon' component={noProjectsIcon}/>
                </Col>
            </Row>
            <Row type='flex' justify='center' align='middle'>
                <Col>
                    <Text strong> No projects created yet ... </Text>
                </Col>
            </Row>
            <Row type='flex' justify='center' align='middle'>
                <Col>
                    <Text type='secondary'> To get started with your annotation project </Text>
                </Col>
            </Row>
            <Row  type='flex' justify='center' align='middle'>
                <Col>
                    <Link to='/projects/create'> create a new project </Link>
                </Col>
            </Row>
        </div>

    )
}