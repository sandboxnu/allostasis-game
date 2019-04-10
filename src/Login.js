import React, { Component } from 'react';
import Axios from 'axios';
import { func } from 'prop-types';
import { Form, Text } from 'informed';
import ServerUtils from './ServerUtils';

const SERVER_URL = ServerUtils.getServerUrl();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badPassword: false,
      password: null,
      shouldShowChangePassword: false,
    };
  }


  onPassword() {
    const { password } = this.state;
    const { onPassword } = this.props;

    Axios.post(`${SERVER_URL}/login`, {}, {
      auth: {
        username: 'user',
        password,
      },
    }).then(() => {
      onPassword(password);
    }).catch(() => {
      this.setState({ badPassword: true });
    });
    
  }

  toggleLogin = () => {
    this.setState({
      shouldShowChangePassword: !this.state.shouldShowChangePassword
    })
  }

  render() {
    const { badPassword } = this.state;
    const changePasswordToggleText = this.state.shouldShowChangePassword ? "Login" : "Change Password";
    const passwordText = this.state.shouldShowChangePassword ? "Please Enter the Old Password:" : "Please Enter the Old Password:";

    return (
      <div className="container" style={{marginTop: '35vh'}}>
        <Form
          onChange={(s) => { this.setState({ password: s.values.inputPassword }); }}
          onSubmit={() => { this.onPassword(); }}>
          <div className="form-group">
            <label htmlFor="inputPassword">{passwordText}</label>
            <Text field="inputPassword" type="password" className="form-control" id="inputPassword" placeholder="Password" />
          </div>
          {badPassword ? <div style={{color: "red", paddingBottom: 10, marginTop: -5}}>Incorrect Password!</div> : null}
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
				<a class="changePasswordToggleButton" onClick={this.toggleLogin}> {changePasswordToggleText}</a>
      </div>
    );
  }
}



export default Login;