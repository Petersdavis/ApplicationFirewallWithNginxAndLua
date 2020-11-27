import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';


class MenuItem extends Component {
  render(){
  
    return(
      <div className = "menu-item-container">
        <Link to={this.props.target}>{this.props.text}</Link>
      </div>

    )
  }
}

export default MenuItem;