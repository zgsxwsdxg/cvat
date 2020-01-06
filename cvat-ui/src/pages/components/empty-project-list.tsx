import React from 'react';

import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import {
    Col,
    Row,
    Icon,
} from 'antd';

function EmptyProjectListIcon(): JSX.Element {
    return <img src='/assets/empty-project-list.svg' alt='No projects' />;
}

// TODO: define CSS classes
export default function EmptyProjectList(): JSX.Element {
    return (
        <div className='cvat-empty-project-list'>
            <Row type='flex' justify='center' align='middle'>
                <Col>
                    <Icon component={EmptyProjectListIcon} />
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
            <Row type='flex' justify='center' align='middle'>
                <Col>
                    <Link to='/projects/create'> create a new project </Link>
                </Col>
            </Row>
        </div>
    );
}
