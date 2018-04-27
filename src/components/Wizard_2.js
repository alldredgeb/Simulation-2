import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelWizard, addWizardTwoInfo } from './../ducks/reducer';
import axios from 'axios';
import small_logo from '../images/houser_logo_small.png';
import circle from '../images/circle.png';
import double_circle from '../images/double_circle.png';
import checked_double_circle from '../images/checked_double_circle.png';

class Wizard_2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_address: this.props.p_address,
      p_city: this.props.p_city,
      p_state: this.props.p_state,
      p_zip: this.props.p_zip
    };
    this.updateAddressOnChange = this.updateAddressOnChange.bind(this);
    this.updateCityOnChange = this.updateCityOnChange.bind(this);
    this.updateStateOnChange = this.updateStateOnChange.bind(this);
    this.updateZipOnChange = this.updateZipOnChange.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/auth').then(() => {
    }).catch(response => {
      this.props.history.push("/");
    })
  }

  updateAddressOnChange(event) {
    this.setState({
      p_address: event.target.value
    })
  }

  updateCityOnChange(event) {
    this.setState({
      p_city: event.target.value
    })
  }

  updateStateOnChange(event) {
    this.setState({
      p_state: event.target.value
    })
  }

  updateZipOnChange(event) {
    this.setState({
      p_zip: event.target.value
    })
  }

  handleLogoutOnClick() {
    axios.get('/api/logout').then(() => {
      this.props.history.push("/");
    })
  }

  //REDUX - update "p_address", "p_city", "p_state", and "p_zip" on Redux state onClick of "Next Step"
  //See line 144

  //REDUX - update "p_address", "p_city", "p_state", and "p_zip" on Redux state onClick of "Previous Step"
  //See line 143

  //REDUX - clear out state in Redux onClick of "Cancel"
  //See line 97

  render() {

    let { cancelWizard, addWizardTwoInfo } = this.props;

    return (
      <div className="wizard_page_two_overall">

        <header>
          <div className="logo_title_and_logout">
            <div className="logo_and_titles">
              <img className="small_logo" src={small_logo} alt="Small Houser Logo" />
              <p>Houser</p>
              <p>Dashboard</p>
            </div>
            <div>
              <button onClick={this.handleLogoutOnClick}>Logout</button>
            </div>
          </div>
        </header>

        <section className="middle_section_below_header">

          <div className="title_and_cancel">
            <button>Add new listing</button>
            <Link to='/dashboard'><button onClick={ () => cancelWizard() }>Cancel</button></Link>
          </div>

          <div className="step_info_container">
            <div className="step_title">
              <p>Step 2</p>
            </div>
            <div className="step_images">
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="double_circle" src={double_circle} alt="Current Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
            </div>
          </div>

          <div className="step_two_form_overall">
            <div className="address_header_and_input">
              <div className="address_header">
                <p>Address</p>
              </div>
              <input className="address_input" onChange={this.updateAddressOnChange} value={this.state.p_address}/>
            </div>
            <div className="city_and_state_container">
              <div className="city_header_and_input">
                <div className="city_header">
                  <p>City</p>
                </div>
                <input className="city_input" onChange={this.updateCityOnChange} value={this.state.p_city}/>
              </div>
              <div className="state_header_and_input">
                <div className="state_header">
                  <p>State</p>
                </div>
                <input className="state_input" onChange={this.updateStateOnChange} value={this.state.p_state}/>
              </div>
            </div>
            <div className="zip_header_and_input">
              <div className="zip_header">
                <p>Zip</p>
              </div>
              <input className="zip_input" type="number" onChange={this.updateZipOnChange} value={this.state.p_zip}/>
            </div>
          </div>

          <div className="prev_and_next_buttons">
            <Link to='/wizard/1'><button onClick={ () => addWizardTwoInfo(this.state) }>Previous</button></Link> 
            {this.state.p_address !== "" && this.state.p_city !== "" && this.state.p_state !== "" && this.state.p_zip !== 0 ? 
              <Link to='/wizard/3'><button onClick={ () => addWizardTwoInfo(this.state) }>Next</button></Link> : 
              <button>Next</button>}
          </div>

        </section>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    p_address: state.p_address,
    p_city: state.p_city,
    p_state: state.p_state,
    p_zip: state.p_zip
  }
}

// 

var outputActions = {
  cancelWizard,
  addWizardTwoInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Wizard_2);