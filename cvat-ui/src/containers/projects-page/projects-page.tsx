import React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../reducers/root-reducer';

interface StateToProps {

}

interface DispatchToProps {

}

function mapStateToProps(state: CombinedState): StateToProps {
    return {
//        tasks: state.tasks,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
//        getTasks: (query: TasksQuery) => {dispatch(getTasksAsync(query))}
    }
}

function ProjectsPageContainer(props: any) {
    return (
        <h1>Hello Word</h1>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsPageContainer);