import React from 'react';
import { connect } from "react-redux";

interface StateToProps {

}

interface DispatchToProps {

}

function mapStateToProps(state: any): StateToProps {
    return {};
}

function dispatchToProps(dispatch: any): DispatchToProps {
    return {};
}

function ProjectItemPage(props: StateToProps & DispatchToProps) {
    return <h1>project-item page</h1>
}

export default connect(mapStateToProps, dispatchToProps)(ProjectItemPage);

