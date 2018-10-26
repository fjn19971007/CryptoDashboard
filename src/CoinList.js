import React from 'react';
import styled, { css } from 'styled-components';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow } from './Style';
import _ from 'lodash';

export const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 40px;
  ${props => props.count && css`
    grid-template-columns: repeat(${props.count}, 1fr);
  `}
`

export const CoinTile = styled.div`
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
  ${props => props.dashboardFavorite && css`
    ${greenBoxShadow}
    &:hover {
      pointer-events: none;
    }
  `}
  ${props => props.chosen && !props.favorite && css`
    pointer-events: none;
    opacity: 0.4;
  `}
`

export const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
`

export const CoinSymbol = styled.div`
  justify-self: right;
`

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${CoinTile}:hover & {
    color: red;
    display: block;
  }
`

export default function(favorites=false) {
  let coinKeys = favorites ?
    this.state.favorites
  :
    ((this.state.filteredCoins && Object.keys(this.state.filteredCoins)) || Object.keys(this.state.coinList).slice(0,100));
  return (
    <CoinGrid count={favorites && this.state.favorites.length}>
      {coinKeys.map(coinKey => {
        return (
          <CoinTile chosen={this.isInFavorites(coinKey)} favorite={favorites} onClick={
            favorites ? () => {this.removeCoinFromFavorites(coinKey)} : () => {this.addCoinToFavorites(coinKey)}
          }>
            <CoinHeaderGrid>
              <div>{this.state.coinList[coinKey].CoinName}</div>
              {favorites ? <DeleteIcon>x</DeleteIcon>
                :
                <CoinSymbol>{this.state.coinList[coinKey].Symbol}</CoinSymbol>}
            </CoinHeaderGrid>
            {<img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`}></img>}
          </CoinTile>
        )
      })}
    </CoinGrid>
  )
}
