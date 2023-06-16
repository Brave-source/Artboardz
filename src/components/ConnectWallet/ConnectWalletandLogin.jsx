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

  // Network checks
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
      <Modal open={isOpen} onClose={() => setIsOpen(false)} >
        <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[360px]">
          <h2 className="text-lg font-semibold mb-4 text-center">Connect Wallet</h2>
          <div className="flex m-auto justify-between">
            {filteredWallets.map((wallet, index) => (
              <div key={index} className="align-center">
                <div className='h-[50px]'>
                  <Image src={wallet.icon} alt={wallet.name} width="50" height="50" className="mx-auto my-4"/>
                </div>
                <div className="text-[12px] text-center my-2">{wallet.name}</div>
                <button
                  className="w-full m-auto  px-1 bg-transparent border border-1 border-white text-white rounded rounded-lg hover:bg-[#6E028F]"
                  onClick={() => handleWalletSelection(wallet)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
          <h2 className="text-lg font-semibold my-4 text-center">Email Login</h2>
          <button
                  className="w-full m-auto h-[35px] px-2 bg-[#6E028F] border border-1 border-white text-white rounded rounded-md hover:bg-transparent"
                  onClick={handleLoginClick}
                >
                 Login
                </button>
                <button
                  className="w-full m-auto mt-4 px-1 bg-transparent  text-white "
                  onClick={handleSignupClick}
                >
                  Create an Account
                </button>

        </div>
      </Modal>

      {isLoginModalOpen && (
        <Modal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        {/* Login Modal Content */}
        <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[360px]">
          <h2 className="text-lg font-semibold mb-4 text-center">Email Login</h2>
          {/* Login form goes here */}
          <form onSubmit={handleLoginSubmit}>
            {/* Login form fields */}
            <div className="flex gap-2 flex-col w-full">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                // onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#011335] border  px-3 border-white rounded h-10 focus:outline-blue-500"
              />
            </div>
      
            <div className="flex gap-2 flex-col w-full mt-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="bg-[#011335] px-3 border border-white rounded h-10 focus:outline-blue-500"
              />
            </div>
      
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button  className="w-full m-auto h-[35px] px-2 bg-transparent border border-1 border-white text-white rounded rounded-lg hover:bg-[#6E028F]" type="button" onClick={() => setIsLoginModalOpen(false)}>
                Cancel
              </button>
              <button 
              className="w-full m-auto  px-2 h-[35px] bg-[#6E028F] border border-1 border-white text-white rounded rounded-md hover:bg-transparent" 
              type="submit">Login</button>
            </div>
          </form>
        </div>
      </Modal>
      )}

      {isSignupModalOpen && (
        <Modal open={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)}>
          {/* Signup Modal Content */}
          <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[380px]">
          <h2 className="text-lg font-semibold mb-4 text-center">Create an Account</h2>
            {/* Signup form goes here */}
            <form onSubmit={handleSignupSubmit}>
              {/* Signup form fields */}
              <div className="flex gap-2 flex-col w-full">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                // onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#011335] border  px-3 border-white rounded h-10 focus:outline-blue-500"
              />
            </div>
      
            <div className="flex gap-2 flex-col w-full mt-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="bg-[#011335] px-3 border border-white rounded h-10 focus:outline-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-col w-full mt-2">
              <label htmlFor="password">Repeat Password:</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                required
                className="bg-[#011335] border border-white rounded h-10 focus:outline-blue-500"
              />
              </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
              <button  className="w-full m-auto h-[35px] px-2 bg-transparent border border-1 border-white text-white rounded rounded-lg hover:bg-[#6E028F]" type="button" onClick={() => setIsSignupModalOpen(false)}>
                Cancel
              </button>
              <button 
              className="w-full m-auto  px-2 h-[35px] bg-[#6E028F] border border-1 border-white text-white rounded rounded-md hover:bg-transparent" 
              type="submit">Create</button>
              </div>
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
