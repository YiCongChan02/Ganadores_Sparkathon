import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import the Button component
import { Button } from '@nextui-org/react';

function Homepage() {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);

  // Define a function to fetch data from the CoinGecko API for the specified page
  const fetchCryptoData = async (pageNumber) => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: pageNumber, // Use the specified page number
            sparkline: false,
          },
        }
      );

      setCryptoData(response.data);
    } catch (error) {
      console.error('Error fetching data from CoinGecko:', error);
    }
  };

  // Fetch data when the component mounts and whenever the page changes
  useEffect(() => {
    fetchCryptoData(page);
  }, [page]);

  const nextPage = () => {
    // Increment the page number to load the next page of data
    setPage(page + 1);
  };

  const prevPage = () => {
    // Decrement the page number to load the previous page of data, but don't go below page 1
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ padding: '0 10%', textAlign: 'center' }}>
      {/* Add the login button at the top right */}
      <Button
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        style={{
          position: 'absolute',
          top: '30px',
          right: '180px',
          width: '120px',
          height: '42px',
          fontSize: '18px',
          borderRadius: '50px'
        }}
      >
        Login
      </Button>

      <h1 style={{ fontSize: '32px', textAlign: 'left', marginTop: '20px' }}>
        Cryptocurrency Prices by Market Cap
      </h1>
      <h5 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'left', marginTop: '10px' }}>
        Ganadores Sparkathon
      </h5>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>#</th>
            <th style={{ textAlign: 'left' }}>Coin</th>
            <th style={{ textAlign: 'left' }}>Price (USD)</th>
            <th style={{ textAlign: 'left' }}>Volume</th>
            <th style={{ textAlign: 'left' }}>MarketCap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto, index) => (
            <tr
              key={crypto.id}
              style={{
                borderBottom: '1px solid #ddd',
              }}
            >
              <td style={{textAlign: 'left'}}>{index + 1}</td>
              <td style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '5px',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                />
                <span style={{ fontSize: '16px' }}>
                  {crypto.name}{' '}
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#777',
                    }}
                  >
                    ({crypto.symbol})
                  </span>
                </span>
              </td>
              <td style={{textAlign: 'left'}}>${crypto.current_price.toFixed(2)}</td>
              <td style={{textAlign: 'left'}}>${crypto.total_volume.toLocaleString()}</td>
              <td style={{textAlign: 'left'}}>${crypto.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Previous Page Button */}
      <Button
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        style={{
          width: '42px',
          height: '42px',
          fontSize: '24px',
          borderRadius: '50%',
          marginTop: '20px',
          marginRight: '20px',
        }}
        onClick={prevPage}
        disabled={page === 1} // Disable the button on the first page
      >
        {"<"}
      </Button>

      {/* Next Page Button */}
      <Button
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        style={{
          width: '42px',
          height: '42px',
          fontSize: '24px',
          borderRadius: '50%',
          marginTop: '20px',
        }}
        onClick={nextPage}
      >
        {">"}
      </Button>
    </div>
  );
}

export default Homepage;
