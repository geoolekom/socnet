import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form, Button } from 'semantic-ui-react';


class AuthForm extends React.Component {

    state = {};

    handleChange = event => { this.setState({ [event.target.name]: event.target.value }) };

    handleSubmit = event => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    render = () => <div>
        <Form onSubmit={ this.handleSubmit } loading={ this.props.isLoading }>
            <Form.Input name="username" placeholder="Username" onChange={ this.handleChange } />
            <Form.Input name="password" placeholder="Password" type="password" onChange={ this.handleChange } />
            <Form.Button type="submit">Login</Form.Button>
        </Form>
    </div>;
}

const mapStateToProps = state => ({
    token: state.auth.token,
    isLoading: state.auth.isLoading
});

import { login } from '../../actions/auth';

const mapDispatchToProps = dispatch => (
    bindActionCreators({ login }, dispatch)
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);