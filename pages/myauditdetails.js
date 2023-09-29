import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../styles/Home.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import 'font-awesome/css/font-awesome.min.css';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

function MyAuditDetails() {
  const { publicKey } = useWallet();

  return (
    <div style={{ padding: '0 0%', textAlign: 'center' ,backgroundColor:'#f4f0ec '}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 6%', // Increased padding for thickness
          width: '100%',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow under the navbar
          marginBottom: '20px',
          backgroundColor: 'white',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Decentraudit</h1>
        {publicKey && publicKey === '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p' ? (
          <a
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              position: 'absolute',
              right: '27%',
              color: 'transparent',
              background: 'linear-gradient(to right, #9c4dcc, #6a1b9a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            Welcome, sparkathance
            <span
              style={{
                marginLeft: '5px',
                padding: '1px 3px',
                borderRadius: '6px',
                background: 'transparent',
                borderWidth: '2px',
                borderStyle: 'solid',
                fontWeight: '600',
                borderColor: '#b388ff',
                fontSize: '12px',
              }}
            >
              ✓
            </span>
            <span
              style={{
                marginLeft: '5px',
                padding: '2px 10px',
                backgroundColor: 'white',
                border: '2px solid grey',
                borderRadius: '6px',
                color: 'grey',
                fontSize: '12px',
              }}
            >
              Not Audited
            </span>
          </a>
        ) : null}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {publicKey && publicKey === '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p' ? (
            <Button
              className={styles.auditButtonAnimation}
              style={{
                marginRight: '20px',
                padding: '9px 18px',
                background: 'transparent',
                borderImageSlice: 1,
                borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
                borderWidth: '3px',
                borderStyle: 'solid',
                fontWeight: '600',
              }}
            >
              My Audit
            </Button>
          ) : null}
          <div
            style={{
              display: 'inline-flex',
              padding: '2px',
              background: 'linear-gradient(to right, #d8b4fe, #b388ff)',
              borderRadius: '52px',
              boxShadow: '0 0 10px 2px rgba(186, 104, 255, 0.3)',
            }}
          >
            <WalletMultiButton
              style={{
                margin: '0',
                borderRadius: '50px',
                minWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{display:'flex', textAlign:'right', justifyContent: 'space-between'}}>
        <h1 style={{ fontSize: '38px', fontWeight: '610', textAlign: 'left', marginLeft:'40px' }}>Market Report</h1>
        <div>
        <Link href="/MyAudit1" >
        <i class="fa fa-backward" aria-hidden="true" style={{ fontSize: '24px', marginRight: '10px' }}></i>
                <Button 
                style={{
                    fontSize: '24px', fontWeight: '610', marginRight:'20px'
                }}>
                    Back
                </Button>
        </Link>
        </div>
      </div>
      <div style={{ display: 'flex' , padding: '0 0%', textAlign: 'left', marginLeft:'20px'}}>
        <div style={{ flex: 1, padding: '20px' }}>
            <p>
            In the first quarter of 2023, Ripple reported a significant increase in XRP sales compared to the previous quarter, totaling $361.06 million after deducting purchases. On-chain activity on the XRP Ledger remained robust, with decentralized exchange volumes rising by 34% to reach $115 million in Q1 2023 compared to Q4 2022. XRP's Average Daily Volume (ADV) on centralized exchanges also surged by 46% to $1 billion from $698 million.
            </p>
            <p>
            During this period, the European Union (EU), the United Kingdom (UK), and the United Arab Emirates (UAE) proposed new regulatory frameworks for cryptocurrencies, emphasizing licensing and activity-based approaches. Developers introduced an interoperability standard (XLS-38d) for the XRP Ledger, enabling seamless digital asset and data transfers across different blockchains, regardless of their underlying protocols or programming languages.
            </p>
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '500' }}>Crypto Market Highlights</h1>
            <p>
            Q1 witnessed significant developments in both crypto and broader financial markets. Despite global inflation concerns and economic turbulence, crypto markets, including XRP, remained resilient. Events such as the fall of Silvergate and the sudden shutdown of Signature Bank resulted in disruptions within the crypto industry, leading to a need for rebuilding fiat rails and finding new banking partners. USDC briefly experienced a de-peg down to $0.85 on some exchanges during this period. Regulatory actions, including the Fed's denial of Custodia's crypto-focused bank membership and joint statements by regulatory agencies, raised concerns about regulators discouraging banks from serving crypto entities in the US.
            </p>
        </div>

        <div 
          style={{  
            textAlign:'right',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.0)', 
            backgroundColor:'#c4c3d0',
            borderTopLeftRadius:'25px',
            borderBottomLeftRadius:'25px',
            height:'200px',
            }}>
          <h1 style={{marginTop:'10px',marginLeft:'20px',marginRight:'20px',fontSize:'28px', fontWeight:'610'}}>Documents Submitted</h1>
          <ul>
              <li style={{marginRight:'20px'}}>Income Statement</li>
              <li style={{marginRight:'20px'}}>Balance Sheet</li>
              <li style={{marginRight:'20px'}}>Cash Flow Statement</li>
              <li style={{marginRight:'20px'}}>Bank Statements and Reconciliations</li>
              <li style={{marginRight:'20px'}}>Invoices and Receipts</li>
              {/* You can add more documents with links as needed */}
            </ul>
        </div>
       </div>
       <div style={{ display: 'flex' , padding: '0 0%', textAlign: 'left', marginLeft:'20px'}}>
        {/* Volume Trends */}
        <div style={{ display: 'flex', padding: '0 0%', textAlign: 'left' }}>
        <div style={{ flex: 1, padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '500' }}>Volume Trends</h1>
            <p>
            In Q1, XRP market volumes increased by 46% QoQ, likely influenced by market recovery and heightened volatility. BTC and ETH spot volumes had mixed performances, with BTC up by 12% and ETH down by 12% QoQ. In contrast, derivatives volumes for BTC and ETH rose by 14% and 20%, respectively. This divergence between spot and derivatives volumes may indicate a leverage-driven rally, partly fueled by confidence in Ethereum's successful Shanghai upgrade, which allowed the withdrawal of staked tokens.
            </p>
        </div>
        </div>

        {/* Global Regulation */}
        <div style={{ display: 'flex', padding: '0 0%', textAlign: 'left', marginLeft: '20px' }}>
        <div style={{ flex: 1, padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '500' }}>Global Regulation</h1>
            <p>
            Several countries, including the EU and the UK, moved forward with crypto legislation and licensing regimes. The EU's Markets in Crypto Assets regulation (MiCA) passed, introducing a new licensing framework. The UK proposed comprehensive crypto regulations, while the UAE established its regulatory regime for virtual assets. Dubai's Virtual Assets Regulatory Authority (VARA) released rules for crypto activities within the city. Australia explored crypto regulation, and Hong Kong and Australia initiated consultations on virtual asset trading platforms and token mapping, respectively.
            </p>
        </div>
        </div>

        {/* US Regulatory Approach */}
        <div style={{ display: 'flex', padding: '0 0%', textAlign: 'left', marginLeft: '20px' }}>
            <div style={{ flex: 1, padding: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '500' }}>US Regulatory Approach</h1>
                <p>
                In the US, crypto regulation continued to focus on enforcement rather than rulemaking. Coinbase and Paxos faced SEC Wells notices, and SEC Chair Gensler warned yield-earning crypto platforms to comply. The SEC filed a lawsuit against Justin Sun, firms, and promoters, alleging market manipulation and securities violations. The CFTC sued Binance and its executives for alleged US trading and derivatives law violations.
                </p>
            </div>
            </div>
        </div>
        <div style={{ display: 'flex', padding: '0 0%', marginTop:'20px'}}>
            <h2 style={{textAlign:'left',fontSize: '24px', fontWeight: '500', marginBottom: '10px' , marginLeft:'40px'}}>
                XRPL On-chain Activity</h2>
            <h2 style={{ textAlign:'left',fontSize: '24px', fontWeight: '500', marginBottom: '10px'  , marginLeft:'450px'}}>
                Summary of Ripple’s XRP Sales (dollars in millions)</h2>
        </div>
        <div style={{ display: 'flex', padding: '0 0%'}}>
            {/* First Table */}
            <table style={{ border: '1px solid #696969 ', borderRadius: '10px', marginLeft:'40px' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #696969 ', padding: '8px' }}>On-Chain Activity</th>
                    <th style={{ border: '1px solid #696969 ', padding: '8px' }}>Q1 2023</th>
                    <th style={{ border: '1px solid #696969 ', padding: '8px' }}>Q4 2022</th>
                    <th style={{ border: '1px solid #696969 ', padding: '8px' }}>Q3 2022</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>Transactions</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>116,341,516</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>106,429,153</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>103,039,261</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>XRP Burned for Transaction Fees</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>140,993</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>101,968</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>146,433</td>
                </tr>
                {/* Add the remaining rows */}
                </tbody>
            </table>

            {/* Second Table */}
            <table style={{ border: '1px solid #696969 ', borderRadius: '10px', marginLeft:'150px', marginRight:'40px' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #696969 ', padding: '8px' }}>Q1 2023</th>
                    <th style={{ border: '1px solid #696969 ', padding: '8px' }}>Q4 2022</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>Total ODL-related sales*</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>2,930.87</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>2,964.28</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>Total purchases</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>2,569.81</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>2,737.97</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>Net Sales</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>361.06</td>
                    <td style={{ border: '1px solid #696969 ', padding: '8px' }}>226.31</td>
                </tr>
                {/* Add more rows if needed */}
                </tbody>
            </table>
            <div style={{ display: 'flex' , padding: '0 0%', textAlign: 'left', marginLeft:'20px'}}>
                <div style={{ padding: '20px' }}>
                    <h1 style={{fontSize: '38px', fontWeight: '610', marginTop:'70px'}}>
                    <a href="https://www.sec.gov/Archives/edgar/data/1824301/000121390021036070/ea143875ex99-6_concordacq.htm#fin_002" rel="noopener noreferrer">
                        Full Report <i className="fa fa-arrow-circle-o-right"></i>
                        </a>
                    </h1>
                    {/* Add content for Full Report here */}
                </div>
            </div>
            </div>
            
            <br></br><br></br>

            </div>
  );
}

export default MyAuditDetails;
