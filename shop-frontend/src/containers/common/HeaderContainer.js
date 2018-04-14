import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as baseActions from 'store/modules/base';
import Header from 'components/common/Header';
import {withRouter} from 'react-router-dom';

class HeaderContainer extends Component {

    handleRemove = () => {}

    showSidebar = () => {
        const {BaseActions} = this.props;
        BaseActions.showSidebar();
    }

    hideSidebar = () => {
        const {BaseActions} = this.props;
        BaseActions.hideSidebar();
    }

    handleMemberLogout = async() => {
        const {BaseActions} = this.props;

        try {
            await BaseActions.memberLogout({userID: localStorage.loggedMember});
            localStorage.loggedMember = null;
            localStorage.memberLogged = "false";
            window.location.href = "/";

        } catch (e) {
            console.log(e);
        }
    }

    handleBurgerToggle = () => {
        const {showSidebar, hideSidebar} = this;
        const {sidebarVisible} = this.props;
        if (sidebarVisible) {
            return hideSidebar();
        }
        showSidebar();
    }

    render() {
        const {handleRemove, handleBurgerToggle, handleMemberLogout, hideSidebar} = this;
        const {logged, sidebarVisible, memberLogged} = this.props;

        return (<Header
            hideSidebar={hideSidebar}
            onToggle={handleBurgerToggle}
            sidebarVisible={sidebarVisible}
            logged={logged}
            memberLogged={memberLogged}
            onMemberLogout={handleMemberLogout}/>);
    }
}

export default connect((state) => ({
    logged: state
        .base
        .get('logged'),
    sidebarVisible: state
        .base
        .get('sidebarVisible'),
    memberLogged: state
        .base
        .get('memberLogged')
}), (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(withRouter(HeaderContainer));