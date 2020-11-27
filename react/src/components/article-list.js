import React, { Component } from 'react';
import ArticleListItem from './article-list-item'

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    let url = "http://localhost:8080/articles";
    fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    }).then((resp) => {
      return resp.json();
    }).then((body) => {
      if (body) {
        this.setState({ articles: body });
      }
    });
  }

  render() {
      let list = [];
      for (let i = 0; i < this.state.articles.length; ++i) {
        list.push(
          <ArticleListItem name={this.state.articles[i]} key={i} />
        )

      }

      return (
        <div>
          {
          list.length > 0 ? list : <h2> No Articles Found</h2>
          }
        </div>
      );

  }
}

export default ArticleList;