import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ItemEditorPane from 'components/itemEditor/ItemEditorPane';
import * as itemEditorActions from 'store/modules/itemEditor';
import * as itemActions from 'store/modules/item';
import ItemEditorWrapper from 'components/itemEditor/ItemEditorWrapper';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';


class ItemEditorContainer extends Component {
    initialize = () => {
        const { ItemEditorActions } = this.props;
        ItemEditorActions.initialize();
    }
    componentDidMount() {
        const { location, ItemEditorActions } = this.props;
        const { id } = queryString.parse(location.search);
        if(id) {
            ItemEditorActions.getItemById(id);
        }
        console.log(id);
        this.initialize();
    }
    handleChangeInput = ({name, value}) => {
        const { ItemEditorActions } = this.props;
        ItemEditorActions.changeInput({name, value});
    }

    

    render() {
        const { handleChangeInput } = this;
        const { title, markdown, price } = this.props;
        return (
            <ItemEditorPane 
            onChangeInput={handleChangeInput}
            title={title}
            markdown={markdown}
            price={price}/>
        );
    }
}

export default connect((state) => ({
    title: state.itemEditor.get('title'),
    markdown: state.itemEditor.get('markdown'),
    price: state.itemEditor.get('price')
}), (dispatch) => ({
    ItemEditorActions: bindActionCreators(itemEditorActions, dispatch),
    ItemActions: bindActionCreators(itemActions, dispatch)
}))(withRouter(ItemEditorContainer));