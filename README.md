
# Crypto DashBoard

## Tech Stacks

* React
* HighCharts
* CryptoCompare API
* Async/await
* Fuzzy Search
* Lodash
* Webkit Inspector

## Features

#### Settings Page with Intro greeting
* Greeting the user on first visit, asking them to choose their favorites
* Providing a default 5 coins as favourites and a complete list of all coins
* searching for coins with fuzzy search
* Hovering and Selecting coins
* Adding/Removing coins on the list of favourites
* Diabling out chosen coins
* Confirm favourite coin
    * Remember those coins for user
    * Generate dashboard prices and historical data

#### Dashboard
* Data initializes from remembered favourites, or forwards to settings page
* Displays 5 major cards for first 5 favourites and compact Cards for next 5
* Renders a line chart for the 10 historical points on current favourite symbol
* Select coins changes and re-fetch data, remembers current favourite
* Select to render historical points on date: Day/Week/Month
* Display name and image of coin next to chart

#### Themes
* Dark and Light UI themes
