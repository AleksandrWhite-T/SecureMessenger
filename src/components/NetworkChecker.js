import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const NetworkChecker = ({ children }) => {
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const POLYGON_MAINNET = {
    chainId: 137,
    chainIdHex: '0x89',
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  };

  const checkNetwork = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      setIsLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      let network = await provider.getNetwork();
      
      const chainIdNum = Number(network.chainId);
      const networkName = network.name;
      
      setCurrentNetwork({
        chainId: chainIdNum,
        name: networkName
      });

      let isPolygon = chainIdNum === POLYGON_MAINNET.chainId;
      setIsCorrectNetwork(isPolygon);
      
      setError('');
    } catch (err) {
      console.error('Network check error:', err);
      setError('Error checking network');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToPolygon = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed');
      return;
    }

    try {
      setIsLoading(true);
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: POLYGON_MAINNET.chainIdHex}]
      });
      
      setTimeout(checkNetwork, 1000);
      
    } catch (switchError) {
      console.error('Network switch error:', switchError);
      
      const errCode = switchError.code;
      if (errCode === 4902) {
        try {
          const chainParams = {
            chainId: POLYGON_MAINNET.chainIdHex,
            chainName: POLYGON_MAINNET.name,
            rpcUrls: [POLYGON_MAINNET.rpcUrl],
            blockExplorerUrls: [POLYGON_MAINNET.blockExplorerUrl],
            nativeCurrency: POLYGON_MAINNET.nativeCurrency
          };
          
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chainParams]
          });
          
          setTimeout(checkNetwork, 1000);
          
        } catch (addError) {
          console.error('Network addition error:', addError);
          alert('Failed to add Polygon Mainnet to MetaMask');
          setIsLoading(false);
        }
      } else {
        alert('Failed to switch to Polygon Mainnet');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    checkNetwork();

    if (window.ethereum) {
      const handleChainChanged = () => {
        setTimeout(checkNetwork, 500);
      };

      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div>Checking network...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          <button 
            onClick={checkNetwork}
            style={{
              padding: '0.5rem 1rem',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            Wrong network
          </div>
          
          <div style={{marginBottom: '1rem', color: '#666'}}>
            Current network: <strong>{currentNetwork ? currentNetwork.name : 'Unknown'} (chainId: {currentNetwork ? currentNetwork.chainId : '?'})</strong>
          </div>
          
          <div style={{ marginBottom: '1.5rem', color: '#666' }}>
            To work with the corporate messenger, you need to connect to <strong>Polygon Mainnet</strong>, 
            as the smart contract is deployed in this network.
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              onClick={switchToPolygon}
              disabled={isLoading}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#8247e5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {isLoading ? 'Switching...' : 'Switch to Polygon'}
            </button>
            
            <button 
              onClick={checkNetwork}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Refresh
            </button>
          </div>
          
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
            If you don't have Polygon Mainnet in MetaMask, we will automatically add it when switching.
          </div>
        </div>
      </div>
    );
  }

  // If network is correct, show main application
  return children;
};

export default NetworkChecker;
