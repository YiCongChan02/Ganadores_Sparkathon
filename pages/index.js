import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic.js'
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// Import the necessary components
import { Button } from '@nextui-org/react';

function Home() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
 
  // solutils hooks
  const { getWalletTokenBalance, result, status, error } = useWalletTokenBalance(publicKey, connection);
  
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
    
    <div style={{ padding: '0 0%', textAlign: 'center' }}>
      
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 6%', // Increased padding for thickness
          width: '100%',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow under the navbar
          marginBottom: '20px'
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
          Ganaudit
        </h1>
        {publicKey && publicKey == '53w111JMbsaa4i9tx1HPcJaj9Uak7bjATegjPH241fiR' ? 
        <a style={{
            fontSize: '18px',
            fontWeight: 'bold',
            position: 'absolute',
            right: '27%',
            // marginTop: '10px',
            color: 'transparent',
            background: 'linear-gradient(to right, #9c4dcc, #6a1b9a)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text'
        }}>
            Welcome, sparkathance 
            <span style={{
                marginLeft: '5px',
                padding: '1px 3px',
                // backgroundColor: 'white',
                // border: '2px solid transparent',
                // backgroundClip: 'padding-box, border-box',
                // backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #9c4dcc, #6a1b9a, #b388ff)', // Darker gradient colors
                // borderRadius: '5px',
                // color: 'transparent',
                // backgroundClip: 'text',
                // WebkitBackgroundClip: 'text',
                borderRadius: '6px',
                background: 'transparent',
                // borderImageSlice: 1,
                // borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
                borderWidth: '2px',
                borderStyle: 'solid',
                fontWeight: '600',
                borderColor: '#b388ff',
                fontSize: '12px'  // Set the font size here
            }}>
                ✓
            </span>
            <span style={{
                marginLeft: '5px',
                padding: '2px 10px',
                backgroundColor: 'white',
                border: '2px solid grey',
                borderRadius: '6px',
                color: 'grey',
                fontSize: '12px'  // Set the font size here
            }}>
                Not Audited
            </span>
        </a>
        : null}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* 53w111JMbsaa4i9tx1HPcJaj9Uak7bjATegjPH241fiR */}
          {/* if publicKey found, display button */}
          {publicKey && publicKey == '53w111JMbsaa4i9tx1HPcJaj9Uak7bjATegjPH241fiR' ? 
          <Button
          className={styles.auditButtonAnimation}
          style={{
            marginRight: '20px',
            padding: '9px 18px',
            // borderRadius: '50px',
            background: 'transparent',
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
            borderWidth: '3px',
            borderStyle: 'solid',
            fontWeight: '600'
          }}
        >
          My Audit
        </Button>
         : null}
          
          {/* Wallet Button */}
          <div 
            style={{
              display: 'inline-flex',
              padding: '2px',
              background: 'linear-gradient(to right, #d8b4fe, #b388ff)',
              borderRadius: '52px',
              boxShadow: '0 0 10px 2px rgba(186, 104, 255, 0.3)'
            }}
          >
            <WalletMultiButton 
              style={{
                margin: '0',
                borderRadius: '50px',
                minWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: '0 10%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', textAlign: 'left', marginTop: '20px' }}>
        Exchange List
      </h1><br></br>
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
              </td>
              <td style={{ textAlign: 'left' }}>{exchange.trust_score}</td>
              <td style={{ textAlign: 'left' }}>{exchange.trade_volume_24h_btc_normalized}</td>
              <td style={{ textAlign: 'left' }}>{exchange.trade_volume_24h_btc}</td>
              <td style={{ textAlign: 'left' }}>{exchange.trade_volume_24h_btc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 'auto', textAlign: 'right', padding: '20px 0' }}>
      {/* Previous Page Button */}
      <Button
        className="bg-gradient-to-tr from-purple-400 to-512DA8 text-white shadow-lg"
        style={{
          width: '42px',
          height: '42px',
          fontSize: '24px',
          borderRadius: '50%',
          marginRight: '10px', // spacing between the buttons
          padding: '2px',
          background: 'linear-gradient(to right, #9c4dcc, #6a1b9a)', // Gradient stroke
          boxShadow: '0 0 10px 2px rgba(129, 81, 168, 0.3)' // Subtle glow effect
        }}
        onClick={prevPage}
        disabled={page === 1} // Disable the button on the first page
      >
        {"<"}
      </Button>

      {/* Next Page Button */}
      <Button
        className="bg-gradient-to-tr from-purple-400 to-512DA8 text-white shadow-lg"
        style={{
          width: '42px',
          height: '42px',
          fontSize: '24px',
          borderRadius: '50%',
          padding: '2px',
          background: 'linear-gradient(to right, #9c4dcc, #6a1b9a)', // Gradient stroke
          boxShadow: '0 0 10px 2px rgba(129, 81, 168, 0.3)' // Subtle glow effect
        }}
        onClick={nextPage}
      >
        {">"}
      </Button>
    </div>

    </div>
    </div>
  );
}

// export default Homepage;
export default dynamic(() => Promise.resolve(Home), {ssr: false});
