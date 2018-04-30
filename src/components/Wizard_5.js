import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelWizard, addWizardFiveInfo } from './../ducks/reducer';
import axios from 'axios';
import small_logo from '../images/houser_logo_small.png';
import double_circle from '../images/double_circle.png';
import checked_double_circle from '../images/checked_double_circle.png';

class Wizard_5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_recommended_rent: this.props.p_recommended_rent,
      p_desired_rent: this.props.p_desired_rent
    };
    this.updateDesiredRentOnChange = this.updateDesiredRentOnChange.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
    this.handleCompleteOnClick = this.handleCompleteOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/auth').then(() => {
    }).catch(response => {
      this.props.history.push("/");
    })
  }

  updateDesiredRentOnChange(event) {
    this.setState({
      p_desired_rent: event.target.value
    })
  }

  handleLogoutOnClick() {
    axios.get('/api/logout').then(() => {
      this.props.history.push("/");
    })
  }

  //REDUX - update "p_desired_rent" on Redux state onClick of "Previous Step"
  //See line 117

  //REDUX - Update db (and clear out state in Redux) onClick of "Complete"
  handleCompleteOnClick() {
    axios.post(`/api/wizard/5`, {
      p_name: this.props.p_name,
      p_description: this.props.p_description,
      p_address: this.props.p_address,
      p_city: this.props.p_city,
      p_state: this.props.p_state,
      p_zip: this.props.p_zip,
      p_img_url: this.props.p_img_url,
      p_loan_amount: this.props.p_loan_amount,
      p_monthly_mortgage: this.props.p_monthly_mortgage,
      p_recommended_rent: this.props.p_recommended_rent,
      p_desired_rent: this.state.p_desired_rent
    }).then( response => {
      console.log(response);
      this.props.cancelWizard();
    })
  }

  //REDUX - clear out state in Redux onClick of "Cancel"
  //See line 89

  render() {

    let { cancelWizard, addWizardFiveInfo, p_recommended_rent } = this.props;

    return (
      <div className="wizard_page_five_overall">
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
              <p>Step 5</p>
            </div>
            <div className="step_images">
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="double_circle" src={double_circle} alt="Current Step Indicator" />
            </div>
          </div>

          <div className="recommended_rent">
            {this.state.p_recommended_rent > 0 ?
            <p>Recommended Rent: $ {p_recommended_rent}</p> :
            <p>Recommended Rent: 0</p>
            }
          </div>

          <div className="desired_rent_header_and_input">
            <div className="desired_rent_header">
              <p>Desired Rent</p>
            </div>
            <input className="desired_rent_input" type="number" onChange={this.updateDesiredRentOnChange} value={this.state.p_desired_rent}/>
          </div>

          <div className="prev_and_complete_buttons">
            <Link to='/wizard/4'><button onClick={ () => addWizardFiveInfo(this.state) }>Previous</button></Link>
            {this.state.p_desired_rent !== 0.00 ? 
              <Link to='/dashboard'><button onClick={ this.handleCompleteOnClick }>Complete</button></Link> : 
              <button>Complete</button>}
          </div>

        </section>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    p_name: state.p_name,
    p_description: state.p_description,
    p_address: state.p_address,
    p_city: state.p_city,
    p_state: state.p_state,
    p_zip: state.p_zip,
    p_img_url: state.p_img_url,
    p_loan_amount: state.p_loan_amount,
    p_monthly_mortgage: state.p_monthly_mortgage,
    p_recommended_rent: state.p_recommended_rent,
    p_desired_rent: state.p_desired_rent
  }
}

// 



var outputActions = {
  cancelWizard,
  addWizardFiveInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Wizard_5);