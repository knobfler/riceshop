import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as baseActions from 'store/modules/base';
import Footer from 'components/common/Footer';

class FooterContainer extends Component {
    handleLoginClick = async () => {
        const { BaseActions, logged } = this.props;
        if(logged) {
            try {
                await BaseActions.adminLogout();
                window.location.reload();
            } catch(e){
                console.log(e);
            }

            return;
        }

        BaseActions.showModal('login');
        BaseActions.initializeLoginModal();
    }
    render() {
        const { handleLoginClick } = this;
        const { logged } = this.props;
        return (
            <Footer
                logged={logged}
                onLoginClick={handleLoginClick}/>
        );
    }
}

export default connect((state) => ({
    logged: state.base.get('logged')
}), (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(FooterContainer);