import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as baseActions from 'store/modules/base';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import { inform } from 'lib/shouldCancel';


class Base extends Component {
    initialize = () => {
        const { BaseActions } = this.props;
        if(localStorage.logged === "true") {
            BaseActions.tempLogin();
        }
        if(localStorage.memberLogged === "true") {
            BaseActions.memberTempLogin();
        }
        BaseActions.checkAdminLogin();
        BaseActions.checkMemberLogin({userID: localStorage.loggedMember});
    }

    componentDidMount() {
        this.initialize();
        inform();
    }
    render() {
        return (
            <div>
                <LoginModalContainer/>
            </div>
        );
    }
}

export default connect((state) => ({}), (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(Base);