import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../styles/Home.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
function MyAudit1() {
  const { publicKey } = useWallet();

  // Sample audit data (replace this with your actual audit data)
  const auditData = [
    {
      date: '2023-09-30',
      complianceScore: 95,
      documents: '5 documents submitted',
      status: 'Done'
    },
    {
      date: '2023-09-25',
      complianceScore: 85,
      documents: '5 documents submitted',
      status: 'Done'
    },
    {
      date: '2023-10-1',
      complianceScore: 92,
      documents: '5 documents submitted',
      status: 'Done'
    },
  ];
  const contentStyle = {
    marginTop: '70px',
    marginLeft: '50px',
     padding: '0 10%'
  };
  

  useEffect(() => {
    // Dynamically load the external CSS file
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/css.gg@2.0.0/icons/css/clipboard.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Clean up: Remove the link element when the component is unmounted
      document.head.removeChild(link);
    };
  }, []); // The empty array means this effect runs only once when the component mounts

  return (
    <div style={{ padding: '0 0%', textAlign: 'center' }}>
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
          opacity:'60%'
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
          backgroundColor: 'white',
        }}
      >
        <Link href="/">
          <Button>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Decentraudit</h1>
          </Button>
        </Link>
        
        {publicKey && publicKey == '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p' ||publicKey && publicKey == '3NkfhjxKvX6eoX1KoxqsQWn6U2UbYFXtk23s7rj2fkyN' ? (
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
          {publicKey && publicKey == '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p'|| publicKey && publicKey == '3NkfhjxKvX6eoX1KoxqsQWn6U2UbYFXtk23s7rj2fkyN' ? (
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
                textOverflow: 'ellipsis'
              }}
            />
          </div>
        </div>
      </div>

      {/* AuditTableList */}
      <div style={contentStyle}>
        <div style={{ margin: '20px', backgroundColor: 'transparent', padding: '20px'}}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>My Audit</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', marginTop:'40px'  }}>
            <thead>
              <tr style={{ fontSize: '20px' }}>
                <th style={{ textAlign: 'center', padding: '15px' }}>No.</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Compliance Score</th>
                <th style={{ textAlign: 'center' }}>Documents</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {auditData.map((audit, index) => (
                <tr key={index} style={{ textAlign: 'center', borderBottom: '1px solid #c0c0c0 ' }}>
                  <td style={{ padding: '20px' }}>{index + 1}</td>
                  <td>{audit.date}</td>
                  <td>{audit.complianceScore}</td>
                  <td style={{display:'flex', justifyContent:'center', padding:'20px'}}>
                    <span className="gg-clipboard" style={{ marginRight:'10px',marginTop:'3px' }} ></span>
                    {audit.documents}
                  </td>
                  <td>{audit.status}</td>
                  <td>
                    <Link href="/myauditdetails">
                      <Button 
                        style={{
                        display: 'inline-flex',
                        height: '40px',
                        width: '100px',
                        border: '2px solid #696969 ',
                        margin: '20px 20px 20px 20px',
                        color: '#555555  ',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontSize: '.8em',
                        letterSpacing: '1.5px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                      }}>View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyAudit1;
