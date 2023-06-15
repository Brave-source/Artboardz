import { useState, useEffect } from 'react';
import { useWallet, useWalletList, useLovelace, useNetwork } from '@meshsdk/react';
import Image from 'next/image';
import { Button, Modal } from '@mui/material';
import { Lucid } from 'lucid-cardano';
import { getWalletAddress, logUserSuccess } from '../../store/redux-slices/userSlice';
import { useDispatch } from 'react-redux';

const ConnectWallet = () => {
  const { wallet, connected, connect, disconnect, connecting } = useWallet();
  const wallets = useWalletList();
  const lovelace = useLovelace();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const network = useNetwork();
  const lovelaceAssets = parseInt(lovelace) / 1000000;
  const dispatch = useDispatch();

  useEffect(() => {
    const storedWallet = localStorage.getItem('selectedWallet');
    const address = JSON.parse(localStorage.getItem('walletAddress'));
    if (storedWallet) {
      setSelectedWallet(JSON.parse(storedWallet));
      connect(JSON.parse(storedWallet)?.name);
    }
    if (address) {
      LuciConnectWalletAddress(JSON.parse(storedWallet)?.name);
    }
  }, []);

  const walletList = ['eternl', 'Nami', 'GeroWallet', 'Flint Wallet'];
  const filteredWallets = wallets.filter((wallet) => walletList.includes(wallet?.name));

  const LuciConnectWalletAddress = async (name) => {
    let api;
    switch (name) {
      case 'eternl':
        api = await window.cardano?.eternl.enable();
        break;
      case 'Nami':
        api = await window.cardano.nami.enable();
        break;
      case 'Flint Wallet':
        api = await window.cardano.flint.enable();
        break;
      case 'GeroWallet':
        api = await window.cardano.gerowallet.enable();
        break;
      default:
        break;
    }
    const lucid = await Lucid.new();
    lucid.selectWallet(api);
    const address = await lucid.wallet.address();
    localStorage.setItem('walletAddress', JSON.stringify(address));
    dispatch(getWalletAddress(address));
  };

  const handleWalletSelection = (wallet) => {
    if (network === 0) {
      alert('This dapp only works on Cardano Mainnet');
      return;
    }
    localStorage.setItem('selectedWallet', JSON.stringify(wallet));
    setSelectedWallet(wallet);
    connect(wallet.name);
    setIsOpen(false);
    LuciConnectWalletAddress(wallet.name);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('selectedWallet');
    localStorage.removeItem('walletAddress');
    disconnect();
    setSelectedWallet(null);
    dispatch(logUserSuccess());
  };

  // Network check
  useEffect(() => {
    if (connected && network === 0) {
      alert('This dapp only works on Cardano Mainnet');
    }
  }, [connected, network]);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };

  const handleLoginSubmit = (formData) => {
    // Handle login form submission
    console.log(formData);
  };

  const handleSignupSubmit = (formData) => {
    // Handle signup form submission
    console.log(formData);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white rounded p-8 max-w-md m-auto">
          <h2 className="text-lg font-semibold mb-4">Connect Wallet</h2>
          <div className="flex m-auto justify-between">
            {filteredWallets.map((wallet, index) => (
              <div key={index} className="align-center">
                <div className="mr-4">
                  <Image src={wallet.icon} alt={wallet.name} width="30" height="30" />
                </div>
                <div className="font-medium">{wallet.name}</div>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleWalletSelection(wallet)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="outlined" onClick={handleSignupClick}>
              Signup
            </Button>
          </div>
        </div>
      </Modal>

      {isLoginModalOpen && (
        <Modal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
          {/* Login Modal Content */}
          <div className="bg-white rounded p-8 max-w-md m-auto">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            {/* Login form goes here */}
            <form onSubmit={handleLoginSubmit}>
              {/* Login form fields */}
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </Modal>
      )}

      {isSignupModalOpen && (
        <Modal open={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)}>
          {/* Signup Modal Content */}
          <div className="bg-white rounded p-8 max-w-md m-auto">
            <h2 className="text-lg font-semibold mb-4">Signup</h2>
            {/* Signup form goes here */}
            <form onSubmit={handleSignupSubmit}>
              {/* Signup form fields */}
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit">Signup</button>
            </form>
          </div>
        </Modal>
      )}

      <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>

      {/* Display connected wallet information */}
    </div>
  );
};

export default ConnectWallet;
