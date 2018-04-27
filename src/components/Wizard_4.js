import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelWizard, addWizardFourInfo } from './../ducks/reducer';
import axios from 'axios';
import small_logo from '../images/houser_logo_small.png';
import circle from '../images/circle.png';
import double_circle from '../images/double_circle.png';
import checked_double_circle from '../images/checked_double_circle.png';

class Wizard_4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_loan_amount: this.props.p_loan_amount,
      p_monthly_mortgage: this.props.p_monthly_mortgage,
      p_recommended_rent: this.props.p_recommended_rent
    };
    this.updateLoanAmountOnChange = this.updateLoanAmountOnChange.bind(this);
    this.updateMonthlyMortgageOnChange = this.updateMonthlyMortgageOnChange.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/auth').then(() => {
    }).catch(response => {
      this.props.history.push("/");
    })
  }

  updateLoanAmountOnChange(event) {
    this.setState({
      p_loan_amount: event.target.value
    })
  }

  updateMonthlyMortgageOnChange(event) {
    var a = Number(event.target.value);
    var b = Number(event.target.value) * 0.25;
    var rr = a + b;
    this.setState({
      p_monthly_mortgage: event.target.value,
      p_recommended_rent: rr
    })
  }

  handleLogoutOnClick() {
    axios.get('/api/logout').then(() => {
      this.props.history.push("/");
    })
  }

  //REDUX - update "p_loan_amount", "p_monthly_mortgage", and "p_recommended_rent" on Redux state onClick of "Next Step"
  //See line 115

  //REDUX - update "p_loan_amount", "p_monthly_mortgage", and "p_recommended_rent" on Redux state onClick of "Previous Step"
  //See line 114

  //REDUX - clear out state in Redux onClick of "Cancel"
  //See line 82

  render() {

    let { cancelWizard, addWizardFourInfo } = this.props;

    return (
      <div className="wizard_page_four_overall">
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
              <p>Step 4</p>
            </div>
            <div className="step_images">
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="double_circle" src={double_circle} alt="Current Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
            </div>
          </div>

          <div className="loan_and_monthly_container">
            <div className="loan_header_and_input">
              <div className="loan_header">
                <p>Loan Amount</p>
              </div>
              <input className="loan_input" type="number" onChange={this.updateLoanAmountOnChange} value={this.state.p_loan_amount}/>
            </div>
            <div className="monthly_header_and_input">
              <div className="monthly_header">
                <p>Monthly Mortgage</p>
              </div>
              <input className="monthly_input" type="number" onChange={this.updateMonthlyMortgageOnChange} value={this.state.p_monthly_mortgage}/>
            </div>
          </div>

          <div className="prev_and_next_buttons">
            <Link to='/wizard/3'><button onClick={ () => addWizardFourInfo(this.state) }>Previous</button></Link>
            {this.p_loan_amount !== 0.00 && this.p_monthly_mortgage !== 0.00 && this.p_recommended_rent !== 0.00 ? 
              <Link to='/wizard/5'><button onClick={ () => addWizardFourInfo(this.state) }>Next</button></Link> : 
              <button>Next</button>}
          </div>

        </section>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    p_loan_amount: state.p_loan_amount,
    p_monthly_mortgage: state.p_monthly_mortgage,
    p_recommended_rent: state.p_recommended_rent
  }
}

// 

var outputActions = {
  cancelWizard,
  addWizardFourInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Wizard_4);