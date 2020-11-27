import React, { Component } from 'react';
import Header from '../components/header'
import ArticleList from '../components/article-list';
import {Button} from 'react-bootstrap';
import {withRouter} from "react-router"; 
import NewArticleModal from '../components/new-article-modal';


class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      createArticleModalOpen:false,
      createArticleName:""

    }
    this.setNewArticleName = this.setNewArticleName.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.setNewArticleName = this.setNewArticleName.bind(this)
    this.openCreateArticleModal = this.openCreateArticleModal.bind(this)
    this.createArticleSubmit = this.createArticleSubmit.bind(this)

  }

  openCreateArticleModal(){
    this.setState({createArticleModalOpen:true})

  }
  createArticleButton(e){
    this.setState({createArticleModalOpen:true})
  }

  setNewArticleName(e){
    this.setState({createArticleName:e.target.value})
  }

  handleClose(e){
    this.setState({createArticleModalOpen:false, createArticleName:""})
  }
  
  createArticleSubmit(e){
    this.props.history.push('/edit/'+this.state.createArticleName);
  }

  render() {
    let buttons =(<Button variant={"primary"} onClick={this.openCreateArticleModal}> <span className={"fas fa-plus-square"} > </span> New </Button>)
    return (
      <div>
        <Header name={"Index"} buttons={buttons}/>
        <ArticleList fetch={fetch}/>
        <NewArticleModal open={this.state.createArticleModalOpen} handleClose={this.handleClose} setNewArticleName={this.setNewArticleName} createArticleName = {this.state.createArticleName} createArticleSubmit={this.createArticleSubmit} ></NewArticleModal>
        
      </div>
    );
  }
}

export default withRouter(Home);