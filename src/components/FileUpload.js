import React, { Component } from 'react';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ files: e.target.files });
  }

  handleSubmit(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.addImage(event.target.result);
    };
    reader.readAsDataURL(this.state.files[0]);
  }

  render() {
    return (
      <form className="file-form" onSubmit={this.handleSubmit}>
        <label htmlFor="file">Upload Image</label>
        <input type="file" id="file" onChange={this.handleChange} name="file" />
        <button type="submit">Add Image</button>
      </form>
    );
  }
}

export default FileUpload;
