import React from 'react';
import { Button } from '@nextui-org/react'; // Make sure to import any necessary components
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic.js'
import Link from 'next/link';
import 'animate.css';
function MyAudit0() {
  const { publicKey } = useWallet();

  return (
    <div style={{ padding: '0 0%', textAlign: 'center' }}>
        {/* Background iframe */}
      <iframe
        src='https://my.spline.design/animatedhaxcle-d4048ad00db0c59bf783555e6aad2b2c/'
        frameborder='0'
        width='100%'
        height='100%'
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '-1',
        }}
      ></iframe>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 6%', // Increased padding for thickness
          width: '100%',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow under the navbar
          marginBottom: '20px',
          backgroundColor:'white'
        }}
      >
        <Link href="/">
          <Button>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Decentraudit</h1>
          </Button>
        </Link>
        {publicKey && publicKey === '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p'||publicKey && publicKey == '3NkfhjxKvX6eoX1KoxqsQWn6U2UbYFXtk23s7rj2fkyN' ? 
          <a style={{
              fontSize: '18px',
              fontWeight: 'bold',
              position: 'absolute',
              right: '27%',
              color: 'transparent',
              background: 'linear-gradient(to right, #9c4dcc, #6a1b9a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}>
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
                fontSize: '12px'
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
                fontSize: '12px'
              }}
            >
              Not Audited
            </span>
          </a>
         : null}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {publicKey && publicKey === '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p' ||publicKey && publicKey == '3NkfhjxKvX6eoX1KoxqsQWn6U2UbYFXtk23s7rj2fkyN'? 
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
                fontWeight: '600'
              }}
            >
              My Audit
            </Button>
           : null}
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
      {/* Button to navigate to the submission page */}
      <div style={{ marginTop: '550px' }}>
          <Link href="/submission-page"> {/* Replace with the actual path to your submission page */}

              <Button className={styles.auditButtonAnimation}
                style={{
                  padding: '9px 18px',
                  background: 'transparent',
                  borderImageSlice: 1,
                  borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  fontWeight: '700',
                  width:'300px',
                  height:'100px',
                  fontSize:'30px',
                  justifyContent:'center',
                  padding:'25px'
                }}
              >
                Get Started
              </Button>
          </Link>
        </div>
    </div>
  );
}

export default MyAudit0;
