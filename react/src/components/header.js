import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
     
    }
  }


  render() {
      return (
      <div className="app-header">
        <h1>Quickipedia -- {this.props.name}
        <span className = "menu-container" >{this.props.buttons}</span>
        </h1>
        
      </div>

    )
  }
}

export default Header;