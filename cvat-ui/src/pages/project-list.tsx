import React from 'react';
import { SearchQuery } from './types/project-list';
import { fetchProjectsRequestThunk } from './actions/project-list';
import { connect } from 'react-redux';
import EmptyProjectList from './components/empty-project-list';
import './styles/project-list.scss';

interface StateToProps {
    isInitialized: boolean;
    error: {
        title: string;
        message: string;
    } | null;
    query: SearchQuery;
}

interface DispatchToProps {
    fetchProjects: (query: SearchQuery) => void;
}

function mapStateToProps(state: any): StateToProps {
    return {
        isInitialized: false,
        error: null,
        query: {
            page: 1,
            id: null,
            search: null,
            owner: null,
            assignee: null,
            name: null,
            status: null,
        }
    }
}

function dispatchToProps(dispatch: any): DispatchToProps {
    return {
        fetchProjects: (query: SearchQuery) => {
            fetchProjectsRequestThunk(query);
        },
    };
}

function ProjectListPage(props: StateToProps & DispatchToProps) {
    return (
        <EmptyProjectList />
    );
}

export default connect(mapStateToProps, dispatchToProps)(ProjectListPage);
