import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import DetailWrapper from 'components/detail/DetailWrapper';
import ItemDetailContainer from 'containers/itemDetail/ItemDetailContainer';
import * as itemActions from 'store/modules/item';
import { bindActionCreators } from 'redux';

const ItemDetailPage = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate>
            <DetailWrapper>
                <ItemDetailContainer id={id}/>
            </DetailWrapper>
        </PageTemplate>
    );
};

ItemDetailPage.preload = (dispatch, params) => {
    const { id } = params;
    const ItemActions = bindActionCreators(itemActions, dispatch);
    return ItemActions.getItemById(id);
  }

export default ItemDetailPage;