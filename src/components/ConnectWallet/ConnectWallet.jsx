import { useState, useEffect, Fragment } from 'react'
import { useWallet, useWalletList, useLovelace, useNetwork } from '@meshsdk/react'
// import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import { Lucid } from "lucid-cardano";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getWalletAddress, logUserSuccess } from '../../store/redux-slices/userSlice';
import { useDispatch } from 'react-redux';
import LoginModal from './LoginModal';
import HeaderProfile from '../User/HeaderProfile';
import { ChevronDownIcon, ChevronUpIcon, PowerIcon, UserIcon, WalletIcon } from '@heroicons/react/24/solid';
import sprayIcon from '../../assets/images/spray-12.png'
import monetIcon from '../../assets/images/transferir 2.png'


const ConnectWallet = () => {
  const { wallet, connected, connect, disconnect, connecting } = useWallet()
  const wallets = useWalletList()
  const lovelace = useLovelace();
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const network = useNetwork();
  const lovelaceAssets = parseInt(lovelace) / 1000000;
  const dispatch = useDispatch();

  useEffect(() => {
    const storedWallet = localStorage.getItem('selectedWallet');
    const address = JSON.parse(localStorage.getItem("walletAddress"));
    if (storedWallet) {
      setSelectedWallet(JSON.parse(storedWallet))
      connect(JSON.parse(storedWallet)?.name);
    }
    if(address) {
      LuciConnectWalletAddress(JSON.parse(storedWallet)?.name);
    }
  }, [])

  const walletList = ["eternl", "Nami", "GeroWallet", "Flint Wallet"]
  const filteredWallets = wallets.filter((wallet) => walletList.includes(wallet?.name));
  const LuciConnectWalletAddress = async(name) => {
    let api;
    switch(name) {
      case "eternl":
        api = await window.cardano?.eternl.enable();
        break;
      case "Nami":
        api = await window.cardano.nami.enable();
        break;
      case "Flint Wallet":
        api = await window.cardano.flint.enable();
        break;
      // case "Typhon Wallet":
      //   api = await window.cardano.typhon.enable();
      //   break;
      // case "Yoroi":
      //   api = await window.cardano.yoroi.enable();
      //   break;
      case "GeroWallet":
        api = await window.cardano.gerowallet.enable();
        break;
      default:
    }
    const lucid = await Lucid.new();
    lucid.selectWallet(api);
    const address = await lucid.wallet.address();
    localStorage.setItem("walletAddress", JSON.stringify(address));
    dispatch(getWalletAddress(address));
  }

  const handleWalletSelection = (wallet) => {
    if (network == 0) {
      alert('This dapp only works on Cardano Mainnet')
      return
    }
    localStorage.setItem('selectedWallet', JSON.stringify(wallet))
    setSelectedWallet(wallet)
    connect(wallet.name)
    setIsOpen(false)
    LuciConnectWalletAddress(wallet.name);
  }

  const handleDisconnect = () => {
    localStorage.removeItem('selectedWallet');
    localStorage.removeItem("walletAddress");
    disconnect()
    setSelectedWallet(null)
    dispatch(logUserSuccess());
  }

  // Dropdown handle
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(connected && !connecting) {
      setAnchorEl(event.currentTarget);
    } else {
      setIsOpenLogin(!isOpenLogin);
    }
    };
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpenNested(false)
  };

  const handleCloseNested = () => {
  
    setIsOpenNested(false)
  };
  // Network check
  useEffect(() => {
    if (connected && network == 0) {
      alert('This dapp only works on Cardano Mainnet');
    }
  }, [connected, network]);

  // Login modal
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const menuStyle = {
    width: '190px',
  }

  // Nested Menu for Connect Wallet
  const [isOpenNested, setIsOpenNested] = useState(false);

  return (
    <div className='text-[#ffffff]'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} // Dropdown
      >
        {/* Wallet connected */}
        {connected && !connecting ? (
          <div className='flex items-center w-[200px] h-[40px] bg-[#123D91] rounded text-white'>
            <HeaderProfile />
            <Typography className='pl-3'>2 </Typography>
            <Image src={sprayIcon} className='h-[16px] w-[16px]'></Image>
            <Typography className='px-2'>|</Typography>
            <Typography className='pr-1'>120,000 </Typography>
            <Image src={monetIcon} className='h-[16px] w-[16px]'></Image>
            {/* Here goes the divider */}
            {open ?
              <ChevronUpIcon className='w-6 pr-1' />
              :
              <ChevronDownIcon className='w-6 pr-1' />
            }
          </div>
        )
          : connecting ? ( // Connecting
            <div className='flex items-center h-[40px] text-white'>
              <div className='bg-[#123D91] w-[147px] py-2 rounded-lg text-[#FFFFFF]'>Connecting</div>
            </div>
          )
            :
            ( // Not Connected
              <div className='flex items-center h-[40px] text-white'>
                <div className='bg-[#123D91] w-[147px] py-2 rounded text-[#FFFFFF]'>Connect</div>
              </div>
            )}
      </Button>
      {connected && !connecting ? ( // Connected
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            marginLeft: '8px'
          }}
        >
          {/* Nested Menu */}
          <MenuItem className='w-[200px] text-white'>
            <button onClick={() => setIsOpenNested(!isOpenNested)} className='flex'>
              <WalletIcon className='w-6 pr-1'/> Connect Wallet {isOpenNested ? <ChevronDownIcon className='w-6 pl-1'/> : <ChevronUpIcon className='w-6 pl-1'/>}
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isOpenNested}
              onClose={handleCloseNested}
              sx={{
                marginLeft: '8px',
                marginTop:'40px',
                
              }}
            >
              <MenuItem className='w-[200px]'>Wallet 1</MenuItem>
              <MenuItem>Wallet 2</MenuItem>
              <MenuItem>Wallet 3</MenuItem>
            </Menu>
          </MenuItem>
          <MenuItem><UserIcon className='w-6 pr-1'/>Profile</MenuItem>
          <MenuItem onClick={handleDisconnect} sx={menuStyle}><PowerIcon className='w-6 pr-1'/>Logout</MenuItem>
        </Menu>
      )
        :
        <Fragment />
      }
      <LoginModal isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
    </div>
  )
}

export default ConnectWallet
