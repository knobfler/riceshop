import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import AlertListContainer from 'containers/alert/AlertListContainer';
import AlertWrapper from 'components/alert/AlertWrapper';
import * as alertActions from 'store/modules/alert';

import { bindActionCreators } from 'redux';

const AlertPage = ({match}) => {
    const { page = 1 } = match.params;
    return (
        <PageTemplate>
            <AlertWrapper>
            <AlertListContainer
                page={parseInt(page, 10)}/>
            </AlertWrapper>
        </PageTemplate>
    );
};

AlertPage.preload = (dispatch, params) => {
    const { page } = params;
    const AlertActions = bindActionCreators(alertActions, dispatch);
    return AlertActions.getAlertItemList({page});
  }

export default AlertPage;