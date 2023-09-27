import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function Detail() {
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
  
  const fetchExchangeCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/exchanges/${id}/tickers`
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
      fetchExchangeCoins();
    }
  }, [id]);

  // Render loading state if data is being fetched
  if (!exchangeDetail || volumeChart.length === 0) {
    return (
      <div style={{ padding: '0 10%', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 10%', textAlign: 'left' }}>
      <h1 style={{ fontSize: '32px', marginTop: '15px' }}>Exchange Detail Page</h1>

      <div style={{ display: 'flex', alignItems: 'flex-end', marginTop:'20px' }}>
        {/* Left side div with logo and name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <img src={exchangeDetail.image} alt={exchangeDetail.name} style={{ width: '200px', height: '200px' }} />
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>{exchangeDetail.name}</h2>
        </div>

        <div style={{ marginLeft: '200px' }}>
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>24h  Volume: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}>{exchangeDetail.trade_volume_24h_btc_normalized}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>Monthly Visit: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}>{exchangeDetail.trade_volume_24h_btc}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>Trust Score: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}>{exchangeDetail.trust_score}</p>

        </div>

        <div style={{ marginLeft: '150px' }}>
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>Country: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}>{exchangeDetail.country}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>Monthly Visit: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}>{exchangeDetail.trade_volume_24h_btc}</p>
          
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>Year Established: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}>{exchangeDetail.year_established}</p>

        </div>

        <div style={{ marginLeft: '150px' }}>
          <p style={{ marginTop: '0px', color: '#7d7d7d', fontSize: '22px' }}>Website: </p>
          <p style={{ color: 'black', fontSize: '25px', marginBottom: '15px' }}><a href={exchangeDetail.url} target="_blank" rel="noopener noreferrer">{exchangeDetail.url}</a></p>
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
            {exchangeCoins.map((coin, index) => (
                
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
      </div>
    </div>
  );
}

export default Detail;
