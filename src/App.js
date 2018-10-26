import React, { Component } from 'react';
import './App.css';
import styled, { css } from 'styled-components';
import AppBar from './AppBar';
import CoinList from './CoinList';
const cc = require('cryptocompare');

const MAX_FAVORITES = 10;

const Logo = styled.div`
  font-size: 1.5em;
`;

const ControlButton = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;

const AppLayout = styled.div`
  padding: 40px;
`;

const Bar = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

const Content = styled.div`

`;

const checkFirstVisit = () => {
  let cryptoDashData = localStorage.getItem('cryptoDash');
  if(!cryptoDashData) {
    return {
      firstVisit: true,
      page: 'settings'
    };
  }
  return {};
}

class App extends Component {
  state = {
    page: 'settings',
    favorites: ["ETH", "BTC", "XMR", "DOGE", "EOS"],
    ...checkFirstVisit()
  };

  componentDidMount() {
    this.fetchCoins();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  }

  displayingDashboard = () => this.state.page === 'dashboard';
  displayingSettings = () => this.state.page === 'settings';
  firstVisitMessage = () => {
    if (this.state.firstVisit) {
      return (
        <div>Welcome to CryptoDash, please select your favourite coins to begin.</div>
      );
    }
  }
  confirmFavourites = () => {
    localStorage.setItem('cryptoDash', 'test');
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
  };

  settingsContent = () => {
    return (
      <div>
        {this.firstVisitMessage()}
        <div onClick={this.confirmFavourites}>
          Confirm Favourites
        </div>
        <div>
          {CoinList.call(this, true)}
          {CoinList.call(this)}
        </div>
      </div>
    );
  };

  loadingContent = () => {
    if (!this.state.coinList) {
      return <div> Loading Coins </div>
    }
  }

  addCoinToFavorites = (key) => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  }

  removeCoinFromFavorites = (key) => {
    console.log('REmove', key);
  }

  render() {
    return (
      <AppLayout>
        {AppBar.apply(this)}
        {this.loadingContent() || <Content>
          {this.displayingSettings() && this.settingsContent()}
        </Content>}
      </AppLayout>
    );
  }
}

export default App;
