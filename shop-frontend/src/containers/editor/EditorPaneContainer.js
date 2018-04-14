import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorPane from 'components/editor/EditorPane';

class EditorPaneContainer extends Component {
    
    handleChangeInput = ({name, value}) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({name, value});
    }

    handleError = () => {
        const { EditorActions } = this.props;
        EditorActions.setError();
    }


    render() {
        const { title, markdown, error } = this.props;
        const { handleChangeInput, handleError } = this;

        return (
            <EditorPane
                title={title}
                markdown={markdown}
                onChangeInput={handleChangeInput}
                error={error}
                onError={handleError}/>
        );
    }
}

export default connect((state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    error: state.editor.get('error')
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
}))(EditorPaneContainer);