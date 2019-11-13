import React from 'react';

import {
    Col,
    Row,
    Pagination,
} from 'antd';

import ProjectItem from '../../containers/projects-page/project-item';

export interface ContentListProps {
    onSwitchPage(page: number): void;
    currentProjectsIndexes: number[];
    page: number;
}

// TODO: className='cvat-project-list'
// TODO: className='cvat-projects-pagination'

export default function ProjectListComponent(props: ContentListProps) {
    const projects = props.currentProjectsIndexes;
    const projectViews = projects.map(
        (pid, id) => <ProjectItem idx={id} projectID={pid} key={pid}/>
    );

    return (
        <>
            <Row type='flex' justify='center' align='middle'>
                <Col className='cvat-project-list' md={22} lg={18} xl={16} xxl={14}>
                    { projectViews }
                </Col>
            </Row>
            <Row type='flex' justify='center' align='middle'>
                <Col md={22} lg={18} xl={16} xxl={14}>
                    <Pagination
                        className='cvat-projects-pagination'
                        onChange={props.onSwitchPage}
                        total={props.numberOfProjects}
                        pageSize={10}
                        current={props.currentPage}
                        showQuickJumper
                    />
                </Col>
            </Row>
        </>
    )
}
