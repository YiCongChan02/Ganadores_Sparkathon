import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link from Next.js

// Import the necessary components
import { Button } from '@nextui-org/react';

function Homepage() {
  const [exchangeData, setExchangeData] = useState([]);
  const [page, setPage] = useState(1);

  // Define a function to fetch data from the CoinGecko API for the specified page
  const fetchExchangeData = async (pageNumber) => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/exchanges',
        {
          params: {
            per_page: 10,
            page: pageNumber, // Use the specified page number
          },
        }
      );

      setExchangeData(response.data);
    } catch (error) {
      console.error('Error fetching data from CoinGecko:', error);
    }
  };

  // Fetch data when the component mounts and whenever the page changes
  useEffect(() => {
    fetchExchangeData(page);
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
        Exchange List
      </h1>
      <h5 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'left', marginTop: '10px' }}>
        Ganadores Sparkathon
      </h5>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>#</th>
            <th style={{ textAlign: 'left' }}>Exchange</th>
            <th style={{ textAlign: 'left' }}>Trust Score</th>
            <th style={{ textAlign: 'left' }}>24h Volume(Normalized)</th>
            <th style={{ textAlign: 'left' }}>24h Volume</th>
            <th style={{ textAlign: 'left' }}>Monthly Visit</th>
          </tr>
        </thead>
        <tbody>
          {exchangeData.map((exchange, index) => (
            <tr
              key={exchange.id}
              style={{
                borderBottom: '1px solid #ddd',
              }}
            >
              <td style={{ textAlign: 'left' }}>{index + 1}</td>
              <td style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <Link style={{alignItems: 'center', display:'flex'}} href={`/detail/${exchange.id}`}>
                  {/* Use Link to navigate to detail page */}
                    <img
                      src={exchange.image}
                      alt={exchange.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        marginRight: '5px',
                        marginTop: '20px',
                        marginBottom: '20px',
                      }}
                    />
                    <span style={{ fontSize: '16px' }}>{exchange.name}</span>
                </Link>
              </td>
              <td style={{ textAlign: 'left' }}>{exchange.trust_score}</td>
              <td style={{ textAlign: 'left' }}>{exchange.trade_volume_24h_btc_normalized}</td>
              <td style={{ textAlign: 'left' }}>{exchange.trade_volume_24h_btc}</td>
              <td style={{ textAlign: 'left' }}>{exchange.trade_volume_24h_btc}</td>
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
      <br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}

export default Homepage;
