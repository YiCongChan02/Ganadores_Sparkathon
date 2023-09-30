import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button } from '@nextui-org/react';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import {
//   Connection,
//   Keypair,
//   PublicKey,
//   SystemProgram,
//   TransactionMessage,
//   VersionedTransaction,
// } from "@solana/web3.js";
import { Transaction, SystemProgram } from '@solana/web3.js';



function AuditorView() {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  
  // const { publicKey, wallet, connected } = useWallet();
  // const { connection } = useConnection();
  // const [isSending, setIsSending] = useState(false);
  // const [txid, setTxid] = useState(null);  

  // const [recipient, setRecipient] = useState("CZxVHe9WZtTZCBucJMWyi1rC5r2kQURfFQmFsEbtG82Z"); // Set your recipient address here
  // const amountToTransfer = 0.01 * 10 ** 9; // 0.01 SOL in lamports

  
  const onClickTransfer = async () => {
    
    if (!publicKey) return;
  
    /** Exercise 5.1: To verify if the PublicKey is valid */
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: "CZxVHe9WZtTZCBucJMWyi1rC5r2kQURfFQmFsEbtG82Z", // Make sure this is a PublicKey object
        lamports: 0.01 * 10 ** 9,    // Convert SOL to lamports if needed
      })
    );

    const { blockhash } = await connection.getRecentBlockhash();

    transaction.recentBlockhash = blockhash;

    transaction.feePayer = publicKey;

    const signedTransaction = await signTransaction(transaction);
    // const txid = await sendTransaction(signedTransaction);
    const txid = await connection.sendRawTransaction(signedTransaction.serialize());


    console.log("Transaction ID:", txid);
  };


  const auditorContainerStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
  };

  const topHeaderStyle = {
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    height: '100px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
  };

  const leftBarStyle = {
    backgroundColor: 'black',
    color: 'white',
    width: '80px',
    height: '100vh',
  };

  const menuIconStyle = {
    fontSize: '32px',
    marginLeft: '30px',
    marginTop:'27px'
  };


  const contentStyle = {
    marginTop:'50px',
    marginLeft:'50px'
  };

  return (
    <div style={auditorContainerStyle}>
        
      {/* Left Bar */}
      <div style={leftBarStyle}>
        {/* Add left sidebar content here */}
        <div style={menuIconStyle}>
          <FontAwesomeIcon icon={faBars} />
          </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <div style={topHeaderStyle}>
          {/* Menu Icon */}
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
          Decentraudit
        </h1>
        <div>
        <Link href="/"> {/* Replace '/stake' with the actual URL you want to navigate to */}
                <Button
                    className={styles.auditButtonAnimation}
                    style={{
                    marginRight: '20px',
                    padding: '9px 18px',
                    // borderRadius: '50px',
                    background: 'white',
                    borderImageSlice: 1,
                    borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    fontWeight: '600',
                    color:'black'
                    }}
                >
                    Home
                </Button>
            </Link>
            <Link href="/AuditStake"> {/* Replace '/stake' with the actual URL you want to navigate to */}
                <Button
                    className={styles.auditButtonAnimation}
                    style={{
                    marginRight: '20px',
                    padding: '9px 18px',
                    // borderRadius: '50px',
                    background: 'white',
                    borderImageSlice: 1,
                    borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    fontWeight: '600',
                    color:'black'
                    }}
                >
                    Stake
                </Button>
            </Link>

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
        
        {/* Content */}
        <div style={contentStyle}>
        <table
            style={{
              width: '80%',borderCollapse: 'collapse', borderSpacing: '0', 
            }}
          >
            <thead>
              <tr style={{fontSize:'20px'}}>
                <th style={{ textAlign: 'center' , padding:'15px'}}>No.</th>
                <th style={{ textAlign: 'center' }}>Exchange</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Due Date</th>
                <th style={{ textAlign: 'center' }}>Ends In</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr style={{ textAlign: 'center', borderBottom: '1px solid #ddd'}}>
                  <td style={{padding:'20px'}}>1</td>
                  <td>Binance</td>
                  <td>Univerified</td>
                  <td>20/9/2023</td>
                  <td>23/9/2023</td>
                  <td>3 days</td>
                  <td>
                    <Button
                        onClick={onClickTransfer} // Add this line
                        style={{
                        padding: '6px 12px',
                        background: '#DF8C5D', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Stake
                    </Button>
                  </td>
                </tr>

                <tr style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{padding:'20px'}}>2</td>
                  <td>Coinbase Exchange</td>
                  <td>Univerified</td>
                  <td>21/9/2023</td>
                  <td>24/9/2023</td>
                  <td>3 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#48C11E', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Staked
                    </Button>
                  </td>
                </tr>
                
                <tr style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{padding:'20px'}}>3</td>
                  <td>Kraken</td>
                  <td>Univerified</td>
                  <td>20/9/2023</td>
                  <td>23/9/2023</td>
                  <td>3 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#928D8B', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Pending
                    </Button>
                  </td>
                </tr>

                <tr style={{ textAlign: 'center' , borderBottom: '1px solid #ddd'}}>
                  <td style={{padding:'20px'}}>4</td>
                  <td>KuKoin</td>
                  <td>Univerified</td>
                  <td>23/9/2023</td>
                  <td>27/9/2023</td>
                  <td>4 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#DF8C5D', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Stake
                    </Button>
                  </td>
                </tr>

                <tr style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{padding:'20px'}}>5</td>
                  <td>MEXC</td>
                  <td>Univerified</td>
                  <td>23/9/2023</td>
                  <td>25/9/2023</td>
                  <td>2 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#C52D23', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Failed
                    </Button>
                  </td>
                </tr>

                <tr style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{padding:'20px'}}>6</td>
                  <td>Bybit</td>
                  <td>Verified</td>
                  <td>21/9/2023</td>
                  <td>25/9/2023</td>
                  <td>4 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#48C11E', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Staked
                    </Button>
                  </td>
                </tr>

                <tr style={{ textAlign: 'center' , borderBottom: '1px solid #ddd'}}>
                  <td style={{padding:'20px'}}>7</td>
                  <td>Bitfinex</td>
                  <td>Univerified</td>
                  <td>22/9/2023</td>
                  <td>25/9/2023</td>
                  <td>3 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#48C11E', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Staked
                    </Button>
                  </td>
                </tr>

                <tr style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{padding:'20px'}}>8</td>
                  <td>Bitstamp</td>
                  <td>Univerified</td>
                  <td>23/9/2023</td>
                  <td>28/9/2023</td>
                  <td>5 days</td>
                  <td>
                    <Button
                        style={{
                        padding: '6px 12px',
                        background: '#48C11E', // Set the background color
                        border: 'none',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '40px',
                        width: '100px',
                        justifyContent:'center'
                        }}
                    >
                        Staked
                    </Button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuditorView;