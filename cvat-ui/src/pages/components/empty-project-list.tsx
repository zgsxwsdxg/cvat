import React from 'react';

import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import {
    Col,
    Row,
    Icon,
} from 'antd';

function EmptyProjectListIcon() {
    return <img src='/assets/empty-project-list.svg'/>;
}

// TODO: define CSS classes
export default function EmptyProjectList() {
    return (
        <div className='cvat-empty-project-list'>
            <Row type='flex' justify='center' align='middle'>
                <Col>
                    <Icon className='cvat-empty-project-list-icon' component={EmptyProjectListIcon}/>
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