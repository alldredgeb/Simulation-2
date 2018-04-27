import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import small_logo from '../images/houser_logo_small.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter_numbers: 0,
      user_properties: []
    }
    this.handleFilterNumbersOnChange = this.handleFilterNumbersOnChange.bind(this);
    this.handleLogoutOnClick = this.handleLogoutOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/dashboard').then( response => {
      console.log(response.data)
      this.setState({
        user_properties: response.data
      })
      }).catch( () => {
        this.props.history.push("/");
    })
  }

  handleLogoutOnClick() {
    axios.get('/api/logout').then(() => {
      this.props.history.push("/");
    })
  }

  handleFilterNumbersOnChange(event) {
    this.setState({
      filter_numbers: event.target.value
    })
  }

  ////////show properties by price filtered for


  //////delete list item onClick
  /*
  handleDeleteOnClick(event) {
    axios.delete('/api/dashboard')
    .then( response => {
      console.log(response);
    })
  }
  */

  render() {
    return (
      <div className="dashboard_overall">

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

        <section className="dash_everything_below_header">
          <div className="dash_middle_section">
          <div className="add_button_container">
            <Link to='/wizard/1'><button>Add new property</button></Link>
          </div>
            <div className="filter_elements">
              <div className="filter_elements_text_and_input_box">
                <p>List properties with "desired rent" greater than: </p>
                <input value={this.state.filter_numbers} onChange={this.handleFilterNumbersOnChange}/>
              </div>
              <div className="filter_parts_filter_and_reset_button">
                <button>Filter</button>
                <button>Reset</button>
              </div>
            </div>
            <div className="horizontal_dividing_line">
            </div>
            <div className="home_listings_title">
              <p>Home Listings</p>
            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default Dashboard;

/*
<div className="individual_property_details_container">
<div className="p_image_name_description">
  <img className="p_detail_image"/>
  <div className="p_name_and_description">
    <p>Insert Name Here</p>
    <p>Insert Description Here</p>
  </div>
</div>

<div className="vertical_dividing_line">
</div>

<div className="p_rest_of_details">
  <p>Loan:{}</p>
  <p>Monthly Mortgage: {}</p>
  <p>Recommended Rent: {}</p>
  <p>Desired Rent: {}</p>
  <p>Address: {}</p>
  <p>City: {}</p>
  <p>State: {}</p>
  <p>Zip: {}</p>
</div>

<img className="delete_icon" onClick={this.handleDeleteOnClick} />
</div>
*/