import React, { Component } from 'react';

class SpecDisplay extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.setState((prevState) => {
      const specs = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      };
      if (navigator.vendor) {
        specs.vendor = navigator.vendor;
      }
      if (navigator.hardwareConcurrency) {
        specs.hardwareConcurrency = navigator.hardwareConcurrency;
      }
      if (navigator.connection) {
        specs.downlink = navigator.connection.downlink;
        specs.effectiveType = navigator.connection.effectiveType;
      }
      return Object.assign(prevState, specs);
    });
  }

  render() {
    const specList = Object.keys(this.state).map((key, i) => {
      return <li key={i}>{key}: {this.state[key]}</li>
    });

    return (
      <div className="spec-display">
        <ul>{specList}</ul>
      </div> 
    );
  }
}

export default SpecDisplay;
