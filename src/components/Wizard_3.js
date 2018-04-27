import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelWizard, addWizardThreeInfo } from './../ducks/reducer';
import axios from 'axios';
import small_logo from '../images/houser_logo_small.png';
import circle from '../images/circle.png';
import double_circle from '../images/double_circle.png';
import checked_double_circle from '../images/checked_double_circle.png';

class Wizard_3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_img_url: this.props.p_img_url
    };
    this.updateImgUrlOnChange = this.updateImgUrlOnChange.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/auth').then(() => {
    }).catch(response => {
      this.props.history.push("/");
    })
  }

  updateImgUrlOnChange(event) {
    this.setState({
      p_img_url: event.target.value
    })
  }

  handleLogoutOnClick() {
    axios.get('/api/logout').then(() => {
      this.props.history.push("/");
    })
  }

  //REDUX - update "p_img_url" on Redux state onClick of "Next Step"
  //See line 103

  //REDUX - update "p_img_url" on Redux state onClick of "Previous Step"
  //See line 102

  //REDUX - clear out state in Redux onClick of "Cancel"
  //See line 73

  render() {

    let { cancelWizard, addWizardThreeInfo, p_img_url } = this.props;

    return (
      <div className="wizard_page_three_overall">

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
              <p>Step 3</p>
            </div>
            <div className="step_images">
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="checked_double_circle" src={checked_double_circle} alt="Finished Step Indicator" />
              <img className="double_circle" src={double_circle} alt="Current Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
              <img className="circle" src={circle} alt="Future Step Indicator" />
            </div>
          </div>

          <div className="preview_and_url_container">
            <div className="preview_container">
              <img className="image_preview" src={p_img_url} alt="Preview" />
            </div>
            <div className="url_header_and_input">
              <div className="url_header">
                <p>Image URL</p>
              </div>
              <input className="url_input" onChange={this.updateImgUrlOnChange} value={this.state.p_img_url}/>
            </div>
          </div>

          <div className="prev_and_next_buttons">
            <Link to='/wizard/2'><button onClick={ () => addWizardThreeInfo(this.state) }>Previous</button></Link>
            {this.p_img_url !== "" ? 
              <Link to='/wizard/4'><button onClick={ () => addWizardThreeInfo(this.state) }>Next</button></Link> : 
              <button>Next</button>}
          </div>

        </section>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    p_img_url: state.p_img_url
  }
}

// 

var outputActions = {
  cancelWizard,
  addWizardThreeInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Wizard_3);