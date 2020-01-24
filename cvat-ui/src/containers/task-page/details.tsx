import React from 'react';
import { connect } from 'react-redux';

import DetailsComponent from 'components/task-page/details';
import { updateTaskAsync } from 'actions/tasks-actions';
import {
    Task,
    CombinedState,
} from 'reducers/interfaces';

interface OwnProps {
    task: Task;
}

interface StateToProps {
    registeredUsers: any[];
    installedGit: boolean;
    projects: any[];
}

interface DispatchToProps {
    onTaskUpdate: (taskInstance: any) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { plugins } = state.plugins;

    return {
        registeredUsers: state.users.users,
        installedGit: plugins.GIT_INTEGRATION,
        projects: state.projects.projects,
    };
}


function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onTaskUpdate: (taskInstance: any): void => dispatch(updateTaskAsync(taskInstance)),
    };
}


function TaskPageContainer(props: StateToProps & DispatchToProps & OwnProps): JSX.Element {
    const {
        task,
        installedGit,
        registeredUsers,
        onTaskUpdate,
        projects,
    } = props;

    return (
        <DetailsComponent
            previewImage={task.preview}
            taskInstance={task.instance}
            installedGit={installedGit}
            onTaskUpdate={onTaskUpdate}
            projects={projects}
            registeredUsers={registeredUsers}
        />
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskPageContainer);
