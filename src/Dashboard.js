import React from 'react';
import styled, {css} from 'styled-components';
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList';
import { fontSizeBig, fontSize3, subtleBoxShadow,
  lightBlueBackground, textAlignCenter, backgroundColor2, fontSize2 } from './Style';
import chartsConfig from './ChartsConfig';
import theme from './chartTheme';
const ReactHighcharts = require('react-highcharts');

ReactHighcharts.Highcharts.setOptions(theme);

const numberFormat = (number) => {
  return +(number + '').slice(0,7);
}

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`

const ChartSelect = styled.select`
  ${backgroundColor2}
  color: #1163c9;
  border: 1px solid;
  ${fontSize2}
  margin: 5px;
  height: 25px;
  float: right;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`

const CoinTileCompact = styled(CoinTile)`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: right;
`

const PaddingBlue = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 5px;
`

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`

export default function() {
  return [
    <CoinGrid key={1}>
      {this.state.prices.map((price, index) => {
        let sym = Object.keys(price)[0];
        let data = price[sym]['USD'];
        let tileProps = {
          key: index,
          dashboardFavorite: sym === this.state.currentFavorite,
          onClick: () => {
            this.setState({ currentFavorite: sym, graphData: null }, this.fetchGraphData);
            localStorage.setItem('cryptoDash', JSON.stringify({
              ...JSON.parse(localStorage.getItem('cryptoDash')),
              currentFavorite: sym
            }));
          }
        }
        return ( index < 5 ?
          <CoinTile { ...tileProps }>
            <CoinHeaderGrid>
              <div>{sym}</div>
              <CoinSymbol>
                <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                  {numberFormat(data.CHANGEPCT24HOUR)}%
                </ChangePct>
              </CoinSymbol>
            </CoinHeaderGrid>
            <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
          </CoinTile>
            :
          <CoinTileCompact { ...tileProps }>
              <div style={{ justifySelf: 'left' }}>{sym}</div>
              <CoinSymbol>
                <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                  {numberFormat(data.CHANGEPCT24HOUR)}%
                </ChangePct>
              </CoinSymbol>
            <div>${numberFormat(data.PRICE)}</div>
          </CoinTileCompact>
        );
      })}
    </CoinGrid>,
    <ChartGrid key={2}>
      <PaddingBlue>
        <h2 style={{textAlign: 'center'}}>{this.state.coinList[this.state.currentFavorite].CoinName}</h2>
        <img
          style={{height: '200px', display: 'block', margin: 'auto'}}
          src={`http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`}

        ></img>
      </PaddingBlue>
      <PaddingBlue>
        <ChartSelect
          defaultValue={'months'}
          onChange={e => {
            this.setState({ timeInterval: e.target.value, graphData: null }, this.fetchGraphData);
          }}
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </ChartSelect>
        {this.state.graphData ? <ReactHighcharts config={chartsConfig.call(this)} />
          :
        <div>Loading graph data...</div>}
      </PaddingBlue>
    </ChartGrid>
  ];
}
