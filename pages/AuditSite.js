import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button } from '@nextui-org/react'; // Adjust the import path as needed
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function Auditor() {
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
          Ganaudit
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
          <div style={{fontSize: '120px',fontWeight: 'bold',marginLeft: '10px',}}>Welcome, </div>
          <div style={{fontSize: '100px',fontWeight: 'bold',marginLeft: '10px',}}>Auditor. </div>
        </div>
      </div>
    </div>
  );
}

export default Auditor;