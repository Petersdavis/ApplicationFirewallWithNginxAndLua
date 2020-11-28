import React, { Component } from 'react';
import Header from '../components/header'
import {compiler} from 'markdown-to-jsx';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Ufo404 from '../assets/ufo404.gif';

class ViewArticle extends Component{
  constructor(props) {
    super(props);
    this.state = {
      content: "It's very easy to make some words **bold** and other words *italic* with Markdown.",
      notFound: false,
      err: false,
    }

  }

  componentDidMount(){
    this.setState({name: this.props.match.params.name})

    let url = "http://localhost:8080/articles/"+this.props.match.params.name;
    this.props.fetch(url, {
      headers: {
        'Accept': 'text/plain',
      },
    }).then((resp) => {
      if(resp.status === 200){
        return resp.text();
      } else if (resp.status === 404) {
        throw "NOT_FOUND";
      }
    }).then((body) => {
      if (body) {
        this.setState({ content: body });
      }
    }).catch((e)=>{
      if(e === "NOT_FOUND"){
        this.setState({ notFound:true, err: "No article with this exact name found. Use [Edit] button in the header to add it." });
      }
    });
  }
  render() {
    let buttons = (<div>
      <Link to={"/"}> 
        <Button variant={"primary"} > <span className={"fas fa-home"} > </span> Index </Button>
      </Link> 
      <Link to={"/edit/"+this.props.name}> 
        <Button variant={"primary"} > <span className={"fas fa-edit"} > </span> Edit </Button>
      </Link>  
    </div>
    );
    let error = null;
    if(this.state.err !== false){
      error = (<div className="btn btn-danger btn-block"> 
        {this.state.err}
      </div>)
    }
    


    
    
    return (
      <div>
        <Header name={this.state.name} buttons={buttons} />
        <div className="article-container">
        {this.state.notFound ? <img className="ufo-image" src={Ufo404} alt="404 Not Found" /> : compiler(this.state.content)}
        </div>
        <div className="feedback">
          {error}
        </div>
      </div>
    );
  }
}

export default ViewArticle;