import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic.js';
import Link from 'next/link';
import 'animate.css';
import CircularProgress from './CircularProgress'; // Import the CircularProgress component
import { Transaction, SystemProgram } from '@solana/web3.js';

function submission2() {
  
  const { publicKey, signTransaction } = useWallet();
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(0); // Track the number of uploaded files
  const [showDetails, setShowDetails] = useState(false); // State for showing/hiding details
  const { connection } = useConnection();

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    // Ensure that only up to 5 files are processed
    const maxFiles = 5;
    const filesToProcess = Array.from(files).slice(0, maxFiles);

    if (filesToProcess.length > 0) {
      if (uploadedFiles + filesToProcess.length > maxFiles) {
        // Display an alert if the maximum limit is exceeded
        alert('You can only upload a maximum of 5 documents.');
      } else {
        // Collect the names of the dropped files
        const newFileNames = [];
        for (let i = 0; i < filesToProcess.length; i++) {
          const file = filesToProcess[i];
          newFileNames.push(file.name);
          console.log('Dropped file:', file.name);
        }

        // Update the state to include both the new and existing file names
        setDroppedFile((prevFile) => {
          const existingFileNames = prevFile ? prevFile.split('\n') : [];
          const updatedFileNames = [...existingFileNames, ...newFileNames];
          return updatedFileNames.join('\n');
        });

        // Update the number of uploaded files
        setUploadedFiles((prevUploaded) => prevUploaded + filesToProcess.length);
      }
    }
  };

  const handleSubmission = () => {
    // You can perform any necessary submission logic here
    // For now, we'll just show a success alert
    setShowDetails(true);
  };

  const dragOverStyles = {
    border: isDragging ? '2px dashed #333' : '2px dashed #5d5d5d',
    backgroundColor: isDragging ? '#f2f3f4  ' : 'transparent',
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
  }, []);

  const onClickTransfer = async () => {
    setShowDetails(false);
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

  return (
    <div style={{ padding: '0 0%', textAlign: 'center' }}>
      {/* Background iframe */}
      <iframe
        src='https://my.spline.design/animatedhaxcle-d4048ad00db0c59bf783555e6aad2b2c/'
        frameBorder='0'
        width='100%'
        height='100%'
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '-1',
          opacity: '30%',
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
        {publicKey && (publicKey === '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p' || publicKey === '3NkfhjxKvX6eoX1KoxqsQWn6U2UbYFXtk23s7rj2fkyN') ? (
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
          {publicKey &&
          (publicKey === '4KFvbU9ukKsXKN3q4JBRhTMTv3Nh47zBAGkfSpUXvk2p' ||
            publicKey === '3NkfhjxKvX6eoX1KoxqsQWn6U2UbYFXtk23s7rj2fkyN') ? (
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
      <div style={{ padding: '0 0%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
      {/* Required documents */}
      <div 
          style={{  
            textAlign:'left',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.0)', 
            backgroundColor:'transparent',
            borderTopLeftRadius:'25px',
            borderBottomLeftRadius:'25px',
            borderTopRightRadius:'25px',
            borderBottomRightRadius:'25px',
            height:'370px',
            position: 'fixed', // Add this to make it stick
            left:'430px',// Add this to stick to the right side
            marginTop:'450px', // Adjust as needed
            transform: 'translateY(-50%)', // Vertically center
            width: '330px', // Adjust the width as needed
            fontsize:'22px',
          }}>
            <br></br>
          <h1 style={{marginTop:'10px',marginLeft:'20px',marginLeft:'20px',fontSize:'px', fontWeight:'500'}}>Documents Required</h1><br></br>
          <ul>
            {/* Required documents */}
            <li style={{marginLeft:'20px'}}>1. Income Statement</li><br></br>
            <li style={{marginLeft:'20px'}}>2. Balance Sheet</li><br></br>
            <li style={{marginLeft:'20px'}}>3. Cash Flow Statement</li><br></br>
            <li style={{marginLeft:'20px'}}>4. Bank Statements and Reconciliations</li><br></br>
            <li style={{marginLeft:'20px'}}>5. Invoices and Receipts</li>
            {/* You can add more documents with links as needed */}
          </ul>
        </div>
        {/* Render the CircularProgress component with the uploadedFiles count */}
        <div style={{ marginLeft: '850px' }}>
          <CircularProgress uploadedFiles={uploadedFiles} />
        </div>
        <div
          style={{
            border: '2px dashed #5d5d5d',
            width: '30%', // Set to 70% of the page width
            height: '270px', // Set the height to 600px
            padding: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
            ...dragOverStyles,
            marginRight:'300px'
          }}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {droppedFile ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {droppedFile.split('\n').map((fileName, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                    fontSize: '22px',
                  }}
                >
                  <span className="gg-clipboard" style={{ marginRight: '10px', marginTop: '3px' }}></span>
                  {`${index + 1}. ${fileName}`}
                </li>
              ))}
            </ul>
          ) : isDragging ? (
            <div style={{ fontSize: '20px' }}>Drop your documents here</div>
          ) : (
            <div style={{ fontSize: '20px' }}>Drag and drop your documents here</div>
          )}
        </div>
      </div>
      {/* Submit button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', borderRadius: '5px', padding: '10px' }}>
        <Button
          onClick={handleSubmission}
          className={styles.auditButtonAnimation}
          style={{
            background: 'transparent',
            width: '28%', // Set the width to match the drag and drop div
            borderRadius: '5px',
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(45deg, #d8b4fe, #ffffff, #b388ff)',
            borderWidth: '3px',
            borderStyle: 'solid',
            fontWeight: '600',
            padding: '9px 18px',
            left:'395px'
          }}
        >
          Submit
        </Button>

        {/* Hidden details div */}
        {showDetails && (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '250px',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.0)',
      borderTopLeftRadius: '25px',
      borderBottomLeftRadius: '25px',
      borderTopRightRadius: '25px',
      borderBottomRightRadius: '25px',
      border: '2px solid #E6D8FF',
      padding: '20px',
      textAlign: 'left',
      zIndex: '9999',
    }}
  >
    <div style={{ marginBottom: '10px' }}>
      <p style={{ fontWeight: '600' }}>Total submission:{uploadedFiles}</p>
      <hr style={{ borderColor: '#ebebeb', margin: '5px 0' }} />
      
    </div>
    <div style={{ marginBottom: '10px' }}>
      <p style={{ fontWeight: '600' }}>Total file size: 1.12GB</p>
      <hr style={{ borderColor: '#ebebeb', margin: '5px 0' }} />
      {/* Calculate total MB here */}
    </div>
    <div style={{ marginBottom: '10px' }}>
      <p style={{ fontWeight: '600' }}>Gas fee: 0.01SOL</p>
      <hr style={{ borderColor: '#ebebeb', margin: '5px 0' }} />
      {/* Calculate gas fee here */}
    </div>
    <div>
    <p style={{ fontWeight: '300px', color:'grey', fontsize:'12px' }}>Note: The gas fee is based on the size of documents submitted</p>
    </div>
    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <Button
          onClick={onClickTransfer} 
          style={{
            background: 'transparent',
            width: '70px',
            borderRadius: '5px',
            border: '2px solid #E6D8FF',
            boxShadow: '0px 4px 10px rgba(230, 216, 255, 10.0)',
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
          }}
        >
          Confirm
        </Button>

    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default submission2;
