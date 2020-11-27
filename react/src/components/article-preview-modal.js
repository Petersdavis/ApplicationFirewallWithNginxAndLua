
import React, { Component } from 'react';
import {Modal, Jumbotron, Button} from 'react-bootstrap'
import {compiler} from 'markdown-to-jsx';

class ArticlePreviewModal extends Component {


  render(){
    return(
      <Modal show={this.props.open} onHide={this.props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Article Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Jumbotron>
            {compiler(this.props.content)}
        </Jumbotron>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={this.props.saveContent}>
          Save Changes
        </Button>
      </Modal.Footer>
      </Modal>
    )
  }
}

export default ArticlePreviewModal;
