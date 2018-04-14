import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActions from 'store/modules/alert';
import * as baseActions from 'store/modules/base';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { withRouter } from 'react-router-dom';

class RemoveModalContainer extends Component {

    handleCancel = () => {
        const {BaseActions} = this.props;
        BaseActions.hideModal('remove');


    }

    handleConfirm = async () => {
        const { BaseActions, id, history } = this.props;
        

        try {
             await BaseActions.removeAlertItem(id);
             BaseActions.hideModal('remove');
             history.push('/alert');
        } catch(e){
            console.log(e);
        }
    }
    render() {
        const {visible} = this.props;
        const { handleCancel, handleConfirm } = this;
        if (!visible) 
            return null;
        return (
            <AskRemoveModal
                onCancel={handleCancel}
                onConfirm={handleConfirm}/>
        );
    }
}

export default connect((state) => ({
    visible: state
        .base
        .getIn(['modal', 'remove'])
}), (dispatch) => ({
    AlertActions: bindActionCreators(alertActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(withRouter(RemoveModalContainer));