import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProductListContainer from 'containers/product/ProductListContainer';
import ListWrapper from 'components/list/ListWrapper';

const ListPage = (props) => {
    return (
        <PageTemplate>
            <ListWrapper>
                <ProductListContainer/>
            </ListWrapper>
        </PageTemplate>
    );
};

export default ListPage;