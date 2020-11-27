import React, { Component } from 'react';
import Header from '../components/header'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ArticlePreviewModal from '../components/article-preview-modal'

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleName: props.match.params.name,
      content: "",
      err:false,
      toast:false,
      preview:false
    }

    this.contentChanged = this.contentChanged.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.validateContent = this.validateContent.bind(this);
    this.openPreview =this.openPreview.bind(this);
    this.closePreview =this.closePreview.bind(this);
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
      } else {
        throw "New Article"
      }
    }).then((body) => {
      if (body) {
        this.setState({ content: body });
      }
    }).catch((e)=>{
      this.setState({content: "", isNew: true})

    });
  }

  validateContent(){
    if(this.state.content === ""){
      return "Cannot Submit Empty Article!"
    }
    return ""
  }
  
  saveContent(){
    let err = this.validateContent();
    if(err !== ""){
      this.setState({err});
      return;
    }

    let url = "http://localhost:8080/articles/"+this.props.match.params.name;
    this.props.fetch(url, {
      headers: {
        'Accept': 'text/plain',
      },
      method: "PUT",
      body:this.state.content
    }).then((resp) => {
      if(resp.status === 200){
        this.setState({toast:"Article Updated!", preview:false})
      } else if (resp.status === 201){
        this.setState({toast:"Article Created!", preview:false, isNew:false})
      }
    })
  }


  contentChanged(e){
    this.setState(
      {content: e.target.value }
    )
  }

  closePreview(){
    this.setState(
      {preview:false}
    )
  }
  openPreview(){
    this.setState(
      {preview:true}
    )
  }

  render() {
    let error = null;
    if(this.state.err){
      error = (<div className="btn btn-danger btn-block"> 
        {this.state.err}
      </div>)
      setTimeout(()=>{this.setState({err:false})}, 2500)
    }
    let toast = null;
    if(this.state.toast){
      toast = (<div className="btn btn-success btn-block"> 
        {this.state.toast}
      </div>)
      setTimeout(()=>{this.setState({toast:false})}, 2500)

    }

    let buttons = (<div>
                    <Link to={"/"}> 
                      <Button variant={"primary"} > <span className={"fas fa-home"} > </span> Index </Button>
                    </Link> 
                    <Button variant={"primary"} onClick={this.openPreview} > <span className={"fas fa-eye"} > </span> Preview </Button>
                    <Link to={"/"+this.props.name}> 
                      <Button variant={"primary"} > <span className={"fas fa-eye"} > </span> View </Button>
                    </Link>
                    <Button variant={"primary"} onClick={this.saveContent} > <span className={"fas fa-save"} > </span> {this.state.isNew? "Create" : "Save"} </Button>
                  </div> )
    return (
      <div>
        <Header   name={this.state.name} buttons = {buttons}/>
        <div className="feedback">
          {error}
          {toast}
        </div>
        <h2>Article Contents: </h2>
        <textarea value={this.state.content} onChange={this.contentChanged}></textarea>

        <ArticlePreviewModal open={this.state.preview} handleClose={this.closePreview} content={this.state.content} saveContent={this.saveContent}></ArticlePreviewModal>
        
      </div>
    );
  }
}

export default EditArticle;