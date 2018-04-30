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
    this.handleDeleteOnClick = this.handleDeleteOnClick.bind(this);
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

  handleDeleteOnClick(id) {
    axios.delete(`/api/dashboard/${id}`)
    .then( response => {
      console.log(response);
    })
  }

  
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
            <ul>

              {this.state.user_properties.map((obj) => {
                return (
                  <div key={obj.id} className="individual_property_details_container">
                  <div className="p_image_name_description">
                    <img className="p_detail_image" src={obj.p_url} alt="home"/>
                    <div className="p_name_and_description">
                      <p>{obj.p_name}</p>
                      <p>{obj.p_description}</p>
                    </div>
                  </div>

                  <div className="vertical_dividing_line">
                  </div>

                  <div className="p_rest_of_details">
                    <p>Loan: ${obj.p_loan_amount}</p>
                    <p>Monthly Mortgage: ${obj.p_mo_mortgage}</p>
                    <p>Recommended Rent: ${obj.p_reco_rent}</p>
                    <p>Desired Rent: ${obj.p_des_rent}</p>
                    <p>Address: {obj.p_address}</p>
                    <p>City: {obj.p_city}</p>
                    <p>State: {obj.p_state}</p>
                    <p>Zip: {obj.p_zip}</p>
                  </div>

                  <img className="delete_icon" onClick={() => {this.handleDeleteOnClick(obj.id)}} alt="delete icon"/>
                  </div>
                )
              })}

            </ul>
          </div>
        </section>

      </div>
    )
  }
}

export default Dashboard;



