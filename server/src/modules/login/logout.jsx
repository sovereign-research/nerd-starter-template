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

import React from "react";
import { collect } from "react-recollect";

// BLUEPRINT STYLES

import {
  InputGroup,
  FormGroup,
  Card,
  Classes,
  Intent,
  ProgressBar,
  Button,
  Callout,
} from "@blueprintjs/core";

import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// RSuite UI Library
import {
  Container,
  Header,
  Navbar,
  Content,
  Sidebar,
  FlexboxGrid,
  Panel,
  Form,
  ButtonToolbar,
  Footer,
} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";

// ASSETS & APP STYLES
import Logo from "../../assets/logo.svg";
import "../../styles/App.less";

import { logout } from "../../services/auth";

class Logout extends React.Component {
  async componentDidMount() {
    try {
      await logout();
    } finally {
      const { from } = this.props.location.state || {
        from: { pathname: "/login" },
      };
      this.props.history.push(from);
    }
  }
  render() {
    return (
      <Container
        style={{
          background: "linear-gradient(45deg, rgba(37, 1, 63, 0.52), black)",
        }}
      >
        <Header></Header>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={24}>
              <div
                className="App-splash"
                style={{ backgroundColor: "transparent" }}
              >
                <Panel bodyFill>
                  <Container style={{ backgroundColor: "#30404d" }}>
                    <Sidebar style={{ width: "320px" }}>
                      <img
                        src={Logo}
                        height="320"
                        style={{
                          background: "linear-gradient(45deg,indigo,black)",
                        }}
                      />
                    </Sidebar>
                    <Container style={{ width: "320px" }}>
                      <Content style={{ padding: "1em" }}>
                        Please Wait - Returning to Login
                      </Content>
                    </Container>
                  </Container>
                </Panel>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    );
  }
}

export default collect(Logout);
