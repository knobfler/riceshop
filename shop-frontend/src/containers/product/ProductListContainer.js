import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as itemActions from 'store/modules/item';
import Item from 'components/list/Item/Item';
import shouldCancel from 'lib/shouldCancel';

class ProductListContainer extends Component {
    getItemList = async () => {
        if(shouldCancel()) return;
        const { ItemActions } = this.props;

        try {
            await ItemActions.getItemList();
        } catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.getItemList();
    }
    render() {
        const { items } = this.props;

        return (
              <div>
                  <Item items={items}/>
              </div>
        );
    }
}

export default connect((state) => ({
    logged: state.base.get('logged'),
    items: state.item.get('items'),
}), (dispatch) => ({
    ItemActions: bindActionCreators(itemActions, dispatch)
}))(ProductListContainer);