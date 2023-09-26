// Get the top 100 cryptocurrencies from CoinMarketCap
const top100Cryptocurrencies = await fetch("https://api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100")
  .then(response => response.json())
  .then(json => json.data);

// Create the table element
const table = document.createElement("table");
table.classList.add("crypto-table");

// Create the table header row
const tableHeaderRow = document.createElement("tr");
const rankHeaderCell = document.createElement("th");
rankHeaderCell.textContent = "Rank";
tableHeaderRow.appendChild(rankHeaderCell);

const nameHeaderCell = document.createElement("th");
nameHeaderCell.textContent = "Name";
tableHeaderRow.appendChild(nameHeaderCell);

const symbolHeaderCell = document.createElement("th");
symbolHeaderCell.textContent = "Symbol";
tableHeaderRow.appendChild(symbolHeaderCell);

const priceHeaderCell = document.createElement("th");
priceHeaderCell.textContent = "Price";
tableHeaderRow.appendChild(priceHeaderCell);

const marketCapHeaderCell = document.createElement("th");
marketCapHeaderCell.textContent = "Market Cap";
tableHeaderRow.appendChild(marketCapHeaderCell);

const volumeHeaderCell = document.createElement("th");
volumeHeaderCell.textContent = "Volume";
tableHeaderCell.appendChild(volumeHeaderCell);

table.appendChild(tableHeaderRow);

// Create the table body rows
top100Cryptocurrencies.forEach(cryptocurrency => {
  const tableRow = document.createElement("tr");

  const rankCell = document.createElement("td");
  rankCell.textContent = cryptocurrency.cmc_rank;
  tableRow.appendChild(rankCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = cryptocurrency.name;
  tableRow.appendChild(nameCell);

  const symbolCell = document.createElement("td");
  symbolCell.textContent = cryptocurrency.symbol;
  tableRow.appendChild(symbolCell);

  const priceCell = document.createElement("td");
  priceCell.textContent = cryptocurrency.quote.USD.price;
  tableRow.appendChild(priceCell);

  const marketCapCell = document.createElement("td");
  marketCapCell.textContent = cryptocurrency.quote.USD.market_cap;
  tableRow.appendChild(marketCapCell);

  const volumeCell = document.createElement("td");
  volumeCell.textContent = cryptocurrency.quote.USD.volume_24h;
  tableRow.appendChild(volumeCell);

  table.appendChild(tableRow);
});

// Append the table to the page
document.body.appendChild(table);
