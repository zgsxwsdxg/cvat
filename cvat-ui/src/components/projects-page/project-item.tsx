import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import Text from 'antd/lib/typography/Text';
import {
    Col,
    Row,
    Button,
    Icon,
    Progress,
    Dropdown,
} from 'antd';

import moment from 'moment';

import ActionsMenu from '../actions-menu/actions-menu';

export interface ProjectItemProps {
    projectInstance: any;
    previewImage: string;
    deleted: boolean;
    onDeleteProject: (projectInstance: any) => void;
}

// TODO: className='cvat-project-item-preview-wrapper'
// TODO: className='cvat-project-item-preview'
// TODO: 'cvat-project-completed-*'
// TODO: className='cvat-projects-list-item'

class ProjectItemComponent extends React.PureComponent<ProjectItemProps & RouteComponentProps> {
    constructor(props: ProjectItemProps & RouteComponentProps) {
        super(props);
    }

    private renderPreview() {
        return (
            <Col span={4}>
                <div className='cvat-project-item-preview-wrapper'>
                    <img alt='Preview' className='cvat-project-item-preview' src={this.props.previewImage}/>
                </div>
            </Col>
        )
    }

    private renderDescription() {
        const project = this.props.projectInstance;
        const { id } = project;
        const owner = project.owner ? project.owner.username : null;
        const updated = moment(project.updatedDate).fromNow();
        const created = moment(project.createdDate).format('MMMM Do YYYY');

        // Get and truncate a task name
        const name = `${project.name.substring(0, 70)}${project.name.length > 70 ? '...' : ''}`;

        return (
            <Col span={10}>
                <Text strong>{`${id} ${name}`}</Text> <br/>
                { owner ?
                    <>
                        <Text type='secondary'>
                            Created { owner ? 'by ' + owner : '' } on {created}
                        </Text> <br/>
                    </> : null
                }
                <Text type='secondary'> Last updated {updated} </Text>
            </Col>
        )
    }

    private renderProgress() {
        const project = this.props.projectInstance;
        // Count number of jobs and performed jobs
        const numOfTasks = 1; // TODO project.tasks.length;
        const numOfCompleted = 0; // TODO project.tasks.filter(
                                  // (task: any) => task.status === 'completed'
                                  // ).length;

        // Progress appearance depends on number of jobs
        const progressColor = numOfCompleted === numOfTasks ? 'cvat-project-completed-progress':
            numOfCompleted ? 'cvat-project-progress-progress' : 'cvat-project-pending-progress';

        return (
            <Col span={6}>
                <Row type='flex' justify='space-between' align='top'>
                    <Col>
                        <svg height='8' width='8' className={progressColor}>
                            <circle cx='4' cy='4' r='4' strokeWidth='0'/>
                        </svg>
                        { numOfCompleted === numOfTasks ?
                            <Text strong className={progressColor}> Completed </Text>
                            : numOfCompleted ?
                            <Text strong className={progressColor}> In Progress </Text>
                            : <Text strong className={progressColor}> Pending </Text>
                        }
                    </Col>
                    <Col>
                        <Text type='secondary'>{`${numOfCompleted} of ${numOfTasks} tasks`}</Text>
                    </Col>
                </Row>
                <Row>
                    <Progress
                            className={`${progressColor} cvat-project-progress`}
                            percent={numOfCompleted * 100 / numOfTasks}
                            strokeColor='#1890FF'
                            showInfo={false}
                            strokeWidth={5}
                            size='small'
                        />
                </Row>
            </Col>
        )
    }

    private renderNavigation() {
        const subMenuIcon = () => (<img src='/assets/icon-sub-menu.svg'/>);
        const { id } = this.props.projectInstance;

        return (
            <Col span={4}>
                <Row type='flex' justify='end'>
                    <Col>
                        <Button type='primary' size='large' ghost onClick={
                            () => this.props.history.push(`/projects/${id}`)
                        }> Open </Button>
                    </Col>
                </Row>
                <Row type='flex' justify='end'>
                    <Col>
                        <Text className='cvat-black-color'> Actions </Text>
                    </Col>
                </Row>
            </Col>
        )
    }

    public render() {
        const style = {};
        if (this.props.deleted) {
            (style as any).pointerEvents = 'none';
            (style as any).opacity = 0.5;
        }

        return (
            <Row className='cvat-projects-list-item' type='flex' justify='center' align='top' style={{...style}}>
                {this.renderPreview()}
                {this.renderDescription()}
                {this.renderProgress()}
                {this.renderNavigation()}
            </Row>
        )
    };
}

export default withRouter(ProjectItemComponent);
