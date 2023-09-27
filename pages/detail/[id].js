import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic.js'
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Button } from '@nextui-org/react';

function Detail() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
 
  // solutils hooks
  const { getWalletTokenBalance, result, status, error } = useWalletTokenBalance(publicKey, connection);
  
  const [exchangeData, setExchangeData] = useState([]);
  const [page, setPage] = useState(1);


  const router = useRouter();
  const { id } = router.query; // Get the exchange ID from the URL

  const [exchangeDetail, setExchangeDetail] = useState(null);
  const [volumeChart, setVolumeChart] = useState([]);
  const [exchangeCoins, setExchangeCoins] = useState([]);
  const [price, setPrice] = useState([]);
  const [spread, setSpread] = useState([]);
  const [volume, setVolume] = useState([]);
  const [trust, setTrust] = useState([]);
  // Define a function to fetch exchange details using the ID
  const fetchExchangeDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges/${id}`
      );

      setExchangeDetail(response.data);
    } catch (error) {
      console.error('Error fetching exchange details:', error);
    }
  };

  // Define a function to fetch the volume chart data
  const fetchVolumeChart = async () => {
    try {
      // Define a date range, for example, the last 30 days
      const endDate = new Date(); // Current date
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 30 days ago

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart`,
        {
          params: {
            id,
            vs_currency: 'usd', // You can specify your desired currency
            days: 30, // Number of days for the volume chart
            from: Math.floor(startDate / 1000), // Convert to seconds
            to: Math.floor(endDate / 1000), // Convert to seconds
          },
        }
      );

      setVolumeChart(response.data);
    } catch (error) {
      console.error('Error fetching volume chart data:', error);
    }
  };

  const fetchExchangeCoins = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges/${id}/tickers`, 
        {
            params: {
              per_page: 10,
              page: pageNumber, // Use the specified page number
            },
          }
      );

      // Extract the list of coins from the response
      const coins = response.data.tickers.map((ticker) => ticker.base);
      const price = response.data.tickers.map((ticker) => ticker.last);
      setExchangeCoins(coins);
      setPrice(price);
      const spread = response.data.tickers.map((ticker) => ticker.bid_ask_spread_percentage);
      setSpread(spread);

      const volume = response.data.tickers.map((ticker) => ticker.volume);
      setVolume(volume);

      const trust = response.data.tickers.map((ticker) => ticker.trust_score);
      setTrust(trust);

    } catch (error) {
      console.error('Error fetching exchange coins:', error);
    }
  };

  // Fetch exchange details and volume chart data when the component mounts or when the ID changes
  useEffect(() => {
    if (id) {
      fetchExchangeDetail();
      fetchVolumeChart();
      fetchExchangeCoins(page);
    }
  }, [id, page]);

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

  // Render loading state if data is being fetched
  if (!exchangeDetail || volumeChart.length === 0) {
    return (
      <div style={{ padding: '0 10%', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

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


    <div style={{ padding: '0 10%', textAlign: 'left' }}>
      <h1 style={{ fontSize: '32px', marginTop: '20px' }}>Exchange Detail Page</h1>

      <div style={{ display: 'flex', alignItems: 'flex-end', marginTop:'20px', marginLeft:'120px' }}>
        {/* Left side div with logo and name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <img src={exchangeDetail.image} alt={exchangeDetail.name} style={{ width: '140px', height: '140px' }} />
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>{exchangeDetail.name}</h2>
        </div>

        <div style={{ marginLeft: '200px' }}>
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>24h  Volume: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}>{exchangeDetail.trade_volume_24h_btc_normalized}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>Monthly Visit: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}>{exchangeDetail.trade_volume_24h_btc}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>Trust Score: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}>{exchangeDetail.trust_score}</p>

        </div>

        <div style={{ marginLeft: '150px' }}>
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>Country: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}>{exchangeDetail.country}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>Monthly Visit: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}>{exchangeDetail.trade_volume_24h_btc}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>Year Established: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}>{exchangeDetail.year_established}</p>

        </div>

        <div style={{ marginLeft: '150px' }}>
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '18px' }}>Website: </p>
          <p style={{ color: 'black', fontSize: '20px', marginBottom: '15px' }}><a href={exchangeDetail.url} target="_blank" rel="noopener noreferrer">{exchangeDetail.url}</a></p>
        </div>
      </div>

      {/* White line */}
      <hr style={{ backgroundColor: 'grey', height: '1px', border: 'none' }} />

      
      {/* List of coins supported by the exchange */}
      <div style={{ padding: '0 10%', textAlign: 'center', marginTop:'20px' }}>
        {/* <h2>Coins Supported by {exchangeDetail.name}</h2> */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{fontSize:'20px'}}>
              <th style={{ textAlign: 'left' }}>#</th>
              <th style={{ textAlign: 'left' }}>Coin</th>
              <th style={{ textAlign: 'left' }}>Pair</th>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'left' }}>Spread</th>
              <th style={{ textAlign: 'left' }}>24h Volume</th>
              <th style={{ textAlign: 'left' }}>Trust Score</th>
            </tr>
          </thead>
          <tbody>
            {exchangeCoins.slice(0,10).map((coin, index) => (
                
              <tr key={coin}>
                <td style={{ textAlign: 'left' }}>{index + 1}</td>
                <td style={{ textAlign: 'left' }}>
                  
                  {coin}
                </td>
                <td style={{ textAlign: 'left' }}>{`${coin}/USDT`}</td>
                <td style={{ textAlign: 'left' }}>{price[index]}</td>
                <td style={{ textAlign: 'left' }}>{spread[index]}</td>
                <td style={{ textAlign: 'left' }}>{volume[index]}</td>
                <td style={{ textAlign: 'left' }}>
                    {trust[index] === "green" ? (
                        "Verified"
                    ) : null}
                </td>
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
    </div>
  );
}

export default Detail;
