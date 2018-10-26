import React from 'react';
import styled, { css } from 'styled-components';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow } from './Style';

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 40px;
`

const CoinTile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
  ${props => props.favorite && css`
    &:hover {
      cursor: pointer;
      ${redBoxShadow}
    }
  `}
`

const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
`

const CoinSymbol = styled.div`
  justify-self: right;
`

export default function(favorites=false) {
  let coinKeys = favorites ? this.state.favorites : Object.keys(this.state.coinList).slice(0,100);
  return (
    <CoinGrid>
      {coinKeys.map(coinKey => {
        return (
          <CoinTile favorite={favorites} onClick={
            favorites ? () => {this.removeCoinFromFavorites(coinKey)} : () => {this.addCoinToFavorites(coinKey)}
          }>
            <CoinHeaderGrid>
              <div>{this.state.coinList[coinKey].CoinName}</div>
              <CoinSymbol>{this.state.coinList[coinKey].Symbol}</CoinSymbol>
            </CoinHeaderGrid>
            {<img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`}></img>}
          </CoinTile>
        )
      })}
    </CoinGrid>
  )
}
