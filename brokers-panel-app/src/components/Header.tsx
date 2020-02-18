import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const Header: React.FC = () => {
   return (
        <div>
          <div >Props & Brokers Panel</div>
          <Link to="/properties_list">
            All Properties     
          </Link>
          <Link to="/brokers_list" >
            All Brokers
          </Link>
          <Link to="/add_broker" >
            Add Broker
          </Link>
          <Link to="/add_property" >
            Add Property
          </Link>
        </div>
    )
  }

export default withRouter(Header)