import React, { Component } from 'react';
import styled, { css } from 'styled-components';


const Logo = styled.div`
  font-size: 1.5em;
`;

const ControlButton = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;

const Bar = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

export default function() {
  return(
    <Bar>
      <Logo>
        CryptoDashboard
      </Logo>
      <div/>
      {!this.state.firstVisit && (
        <ControlButton
          active={this.displayingDashboard()}
          onClick={() => this.setState({ page: 'dashboard' })}
        >
          Dashboard
        </ControlButton>
      )}
      <ControlButton
        active={this.displayingSettings()}
        onClick={() => this.setState({ page: 'settings' })}
      >
        Settings
      </ControlButton>
    </Bar>
  );
}
