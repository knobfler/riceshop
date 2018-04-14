import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import DetailWrapper from 'components/detail/DetailWrapper';
import DetailContainer from 'containers/detail/DetailContainer';
import RemoveModalContainer from 'containers/modal/RemoveModalContainer';
import { bindActionCreators } from 'redux';
import * as alertActions from 'store/modules/alert';

const DetailPage = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate>
            <DetailWrapper>
                <DetailContainer id={id}/>
                <RemoveModalContainer id={id}/>
            </DetailWrapper>
        </PageTemplate>
    );
};


DetailPage.preload = (dispatch, params) => {
    const { id } = params;
    const AlertActions = bindActionCreators(alertActions, dispatch);
    return AlertActions.readAlertItem(id);
  }
export default DetailPage;