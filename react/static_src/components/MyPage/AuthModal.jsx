import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Menu, Loader, Modal} from 'semantic-ui-react';
import AuthForm from './AuthForm';

class AuthModal extends React.Component {

    state = {
        needLogin: this.props.token === null
    };

    toggleLoginPopup = () => {
        this.setState({needLogin: !this.state.needLogin})
    };

    render = () => {
        if (!this.props.token) {
            return <Menu.Menu position="right">
                <Modal size="small" open={ this.state.needLogin } trigger={ <Menu.Item>Login</Menu.Item> }
                       onOpen={ this.toggleLoginPopup }>
                    <Modal.Header>Welcome!</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <AuthForm done={ this.toggleLoginPopup }/>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Menu.Menu>
        } else {
            return <Menu.Menu position="right">
                <Menu.Item content={ this.props.user ? `Hello, ${this.props.user.username}!` :
                    <Loader size='tiny' active inline/> }/>
                <Menu.Item name="logout" onClick={ this.props.logout }/>
            </Menu.Menu>
        }
    };

    componentDidMount = () => {
        this.props.getProfile();
    };
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
});

import { logout, getProfile } from '../../actions/auth';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ logout, getProfile }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthModal);