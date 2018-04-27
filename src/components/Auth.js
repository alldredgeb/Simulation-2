import React, { Component } from 'react';
import axios from 'axios';
import big_logo from '../images/houser_logo_big.png';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
    this.handleRegisterRequest = this.handleRegisterRequest.bind(this);
  }

  componentDidMount() {
    axios.get('/api/auth').then(() => {
      this.props.history.push("/dashboard");
      }).catch(response => {
    })
  }

  handleUsernameOnChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordOnChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  //set up method to take the un and pw, send axios post. If un and pw match something in db, route to the Dashboard. If not, alert (register!)
  handleLoginRequest(event) {
    axios.post('/api/login', {
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log(response);
      this.props.history.push("/dashboard");
    }).catch(response => {
      alert("Username or Password not found. Try again, or Register to log in.");
    })
  }

  handleRegisterRequest(event) {
    axios.post('/api/register', {
      username: this.state.username,
      password: this.state.password
    }).then( response => {
      console.log(response);
      this.props.history.push("/dashboard");
    }).catch( response => {
      alert("Username already in use. Please log in.");
    })
  }

  
  render() {
    return (
      <div className="auth_page_overall">

        <section className="auth_page_middle_section">

          <div className="logo_and_title">
            <img className="big_logo" src={big_logo} alt="Houser Logo" />
          </div>

          <div className="username_title_and_input_box">
            <div className="username_title">
              <p>Username</p>
            </div>
            <div className="username_input_box">
              <input onChange={this.handleUsernameOnChange} />
            </div>
          </div>

          <div className="password_title_and_input_box">
            <div className="password_title">
              <p>Password</p>
            </div>
            <div className="password_input_box">
              <input type="password" onChange={this.handlePasswordOnChange} />
            </div>
          </div>

          <div className="login_and_register_buttons">
            <div className="login_button">
              <button onClick={this.handleLoginRequest}>Login</button>
            </div>
            <div className="register_button">
            <button onClick={this.handleRegisterRequest}>Register</button>
            </div>
          </div>

        </section>

      </div>
    )
  }
}

export default Auth;