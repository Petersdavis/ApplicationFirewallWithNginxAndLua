
import React, { Component } from 'react';
import {FormControl, Modal, Button} from 'react-bootstrap'

class NewArticleModal extends Component {

  render(){
    return(
      <Modal show={this.props.open} onHide={this.props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Quicki Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <FormControl
        placeholder="Article Name"
        value={this.props.createArticleName}
        onChange={this.props.setNewArticleName}
      />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={this.props.createArticleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }
}

export default NewArticleModal;
