import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from './Style';

const SearchContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 20px;
`

const SearchInput = styled.input`
  place-self: center left;
  ${fontSize2}
  ${backgroundColor2}
  color: #1163c9;
  border: 1px solid;
  margin: 5px;
  height: 25px;
`

export default function() {
  return (
    <SearchContainer>
      <h2> Search all coins </h2>
      <SearchInput onKeyUp={this.filterCoins}/>
    </SearchContainer>
  )
}
