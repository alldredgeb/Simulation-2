import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelWizard, addWizardOneInfo } from './../ducks/reducer';
import axios from 'axios';
import small_logo from '../images/houser_logo_small.png';
import circle from '../images/circle.png';
import double_circle from '../images/double_circle.png';

class Wizard_1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_name: this.props.p_name,
      p_description: this.props.p_description
    };
    this.updateNameOnChange = this.updateNameOnChange.bind(this);
    this.updateDescriptionOnChange = this.updateDescriptionOnChange.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/auth').then(() => {
    }).catch(response => {
      this.props.history.push("/");
    })
  }

  updateNameOnChange(event) {
    this.setState({
      p_name: event.target.value
    })
  }

  updateDescriptionOnChange(event) {
    this.setState({
      p_description: event.target.value
    })
  }

  handleLogoutOnClick() {
    axios.get('/api/logout').then(() => {
      this.props.history.push("/");
    })
  }

  //REDUX - update "p_name" and "p_description" on Redux state onClick of "Next Step"
  //SEE LINE 109

  //REDUX - clear out state in Redux onClick of "Cancel"
  //SEE LINE 77

  render() {

    let { cancelWizard, addWizardOneInfo } = this.props;

    return (
      <div className="wizard_page_one_overall">

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
              <p>Step 1</p>
            </div>
            <div className="step_images">
              <img className="double_circle" src={double_circle} alt="Current Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
            </div>
          </div>

          <div className="step_one_form_overall">
            <div className="name_header_and_input_box">
              <div className="name_header">
                <p>Property Name</p>
              </div>
              <input className="name_input_box" onChange={this.updateNameOnChange} value={this.state.p_name}/>
            </div>
            <div className="description_header_and_input_box">
              <div className="description_header">
                <p>Property Description</p>
              </div>
              <input className="description_input_box" onChange={this.updateDescriptionOnChange} value={this.state.p_description}/>
            </div>
          </div>

          <div className="next_button">
            {this.state.p_name !== "" && this.state.p_description !== "" ? 
              <Link to='/wizard/2'><button onClick={ () => addWizardOneInfo(this.state) }>Next</button></Link> : 
              <button>Next</button>}
          </div>

        </section>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    p_name: state.p_name,
    p_description: state.p_description
  }
}

var outputActions = {
  cancelWizard,
  addWizardOneInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Wizard_1);