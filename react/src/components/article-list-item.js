import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ArticleListItem extends Component {

  render() {
   
    return (
      <li className="article-card">
        <Link to={"/"+this.props.name}>
          <h2>{this.props.name}</h2>
        </Link> 
      </li>
    )
  }
}

export default ArticleListItem;