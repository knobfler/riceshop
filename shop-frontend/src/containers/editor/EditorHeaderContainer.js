import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorHeader from 'components/editor/EditorHeader';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class EditorHeaderContainer extends Component {

    componentDidMount() {
        const { EditorActions, location } = this.props;
        EditorActions.initialize();

        const { id } = queryString.parse(location.search);
        if(id){
            EditorActions.getAlertItem(id);
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }

  

    handleSubmit = async () => {
        const { EditorActions, title, markdown, history, location } = this.props;
        const alert = {
            title,
            body: markdown
        };
        try {
            const { id } = queryString.parse(location.search);
            if(id){
                await EditorActions.editAlertItem({id, ...alert});
                history.push(`/alert/detail/${id}`);
                return;
            }
            await EditorActions.writeAlertItem(alert);
            history.push(`/alert/detail/${this.props.alertId}`);
        } catch(e){
            console.log(e);
        }
    }
    render() {
        const { handleGoBack, handleSubmit } = this;
        const { id } = queryString.parse(this.props.location.search);
        return (
            <EditorHeader
                isEdit={id ? true : false}
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}/>
        );
    }
}

export default connect((state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    alertId: state.editor.get('alertId')
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
}))(withRouter(EditorHeaderContainer));