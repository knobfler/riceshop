import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DetailItem from 'components/detail/DetailItem';
import * as alertActions from 'store/modules/alert';
import * as baseActions from 'store/modules/base';
import shouldCancel from 'lib/shouldCancel';


class DetailContainer extends Component {
    getAlertDetail = () => {
        if(shouldCancel()) return;
        const { AlertActions, id } = this.props;
        AlertActions.readAlertItem(id);
    }

    handleRemoveClick = () => {
        const { BaseActions } = this.props;
        BaseActions.showModal('remove')
    }



    componentDidMount() {
        this.getAlertDetail();
    }
    render() {
        const { alert, logged, id } = this.props;
        const { title, body } = alert.toJS();
        const { handleRemoveClick } = this;
        return (
            <div>
                <DetailItem
                    id={id}
                    onRemoveClick={handleRemoveClick}
                    title={title}
                    body={body}
                    logged={logged}/>
            </div>
        );
    }
}

export default connect((state) => ({
    alert: state.alert.get('alert'),
    logged: state.base.get('logged')
}), (dispatch) => ({
    AlertActions: bindActionCreators(alertActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(DetailContainer);