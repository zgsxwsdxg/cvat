import React from 'react';
import {
    Col,
    Row,
} from 'antd';

interface Props {
    id: number;
    name: string;
    status: string;
    owner: string;
    assignee: string;
    createdDate: string;
    updatedDate: string;
    bugTracker: string;
}

function ProjectItem(props: Props): JSX.Element {
    const {
        id,
        name,
        status,
        owner,
        assignee,
        createdDate,
        updatedDate,
    } = props;
    return (
        <div class='cvat-project-item'>
            <Row type='flex'>
                <Col>
                    {id}
                </Col>
                <Col>
                    <span>{name}</span>
                    <span>{assignee}</span>
                    <span>Created by {owner} on {createdDate}</span>
                    <span>Updated on {updatedDate}</span>
                </Col>
                <Col>
                    {status}
                </Col>
            </Row>
        </div>
    );
}