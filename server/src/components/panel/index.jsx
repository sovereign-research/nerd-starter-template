/*                                            *\
** ------------------------------------------ **
**           Sample - NERD Starter    	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

import React, { Component } from "react";
import { collect } from "react-recollect";

// RSuite UI Library
import {
  Container,
  Icon,
  Panel,
  Content,
  Row,
  Col,
  InputGroup,
} from "rsuite";

import "rsuite/dist/styles/rsuite-dark.css";

class WBPanel extends Component {
  constructor(props) {
    super(props);

    this.renderBody = this.renderBody.bind(this);
    this.renderHeader = this.renderHeader.bind(this);

    this.store = props.store;

    this.state = {
      title: props.title,
      renderHeader: props.renderHeader || this.renderHeader,
      renderBody: props.renderBody || this.renderBody,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  renderHeader() {
    return (
      <Row>
        <Col>
          <h3>{this.state.header}</h3>
        </Col>
      </Row>
    );
  }

  renderBody() {
      return (<div></div>)
  }

  render() {
    return (
      <React.Fragment>
        <Panel bordered header={this.renderHeader()}>
          {this.renderBody()}
        </Panel>
      </React.Fragment>
    );
  }
}

export default collect(WBPanel);
