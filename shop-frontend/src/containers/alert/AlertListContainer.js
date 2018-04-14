import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as alertActions from 'store/modules/alert';
import AlertList from 'components/alert/AlertList';
import Pagination from 'components/common/Pagination';
import shouldCancel from 'lib/shouldCancel';

class AlertListContainer extends Component {
    getAlertItemList = () => {
        if(shouldCancel()) return;
        const {page, AlertActions} = this.props;
        AlertActions.getAlertItemList({page});
    }


    
    componentDidMount() {
        this.getAlertItemList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.page !== this.props.page) {
            this.getAlertItemList();
            document.documentElement.scrollTop = 0;
        }
    }
    render() {
        const {loading, lastPage, alerts, page} = this.props;
        if (loading) 
            return null;
        return (
            <div>
                <AlertList alerts={alerts}/>
                <Pagination lastPage={lastPage} page={page}/>
            </div>
        );
    }
}

export default connect((state) => ({
    lastPage: state
        .alert
        .get('lastPage'),
    alerts: state
        .alert
        .get('alerts'),
    loading: state.pender.pending['alert/GET_ALERT_ITEM_LIST']
}), (dispatch) => ({
    AlertActions: bindActionCreators(alertActions, dispatch)
}))(AlertListContainer);