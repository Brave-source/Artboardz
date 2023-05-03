import { useState, useEffect } from 'react'
import { useWallet, useWalletList, useLovelace, useNetwork } from '@meshsdk/react'
// import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import { Lucid } from "lucid-cardano";
import Dropdown from './Dropdown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getWalletAddress, logUserSuccess } from '../../store/redux-slices/userSlice';
import { useDispatch } from 'react-redux';

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
        // const address = JSON.parse(localStorage.getItem("walletAddress"));
        if (storedWallet) {
            setSelectedWallet(JSON.parse(storedWallet))
            connect(JSON.parse(storedWallet).name);
        }
        // if(address) {
        //     LuciConnectWalletAddress(JSON.parse(storedWallet).name);
        // }
    }, [])
    // const walletList = ["eternl", "Nami", "GeroWallet", "Flint Wallet"]
    // const filteredWallets = wallets.filter((wallet) => walletList.includes(wallet.name));
    // const LuciConnectWalletAddress = async(name) => {
    //     let api;
    //     switch(name) {
    //         case "eternl":
    //             api = await window.cardano?.eternl.enable();
    //             break;
    //         case "Nami":
    //             api = await window.cardano.nami.enable();
    //             break;
    //         case "Flint Wallet":
    //             api = await window.cardano.flint.enable();
    //             break;
    //         // case "Typhon Wallet":
    //         //     api = await window.cardano.typhon.enable();
    //         //     break;
    //         // case "Yoroi":
    //         //     api = await window.cardano.yoroi.enable();
    //         //     break;
    //         case "GeroWallet":
    //             api = await window.cardano.gerowallet.enable();
    //             break;
    //         default:
                                                                                     
    //     }
    //     const  lucid = await Lucid.new();
    //     lucid.selectWallet(api);
    //     const address = await lucid.wallet.address();
    //     localStorage.setItem("walletAddress", JSON.stringify(address));
    //     dispatch(getWalletAddress(address));
    // }

    const handleWalletSelection = (wallet) => {
        if (network == 0) {
          alert('This dapp only works on Cardano Mainnet')
          return
        } 
        localStorage.setItem('selectedWallet', JSON.stringify(wallet))
        setSelectedWallet(wallet)
        connect(wallet.name)
        setIsOpen(false)
        // LuciConnectWalletAddress(wallet.name);
      }

    const handleDisconnect = () => {
        localStorage.removeItem('selectedWallet');
        // localStorage.removeItem("walletAddress");
        disconnect()
        setSelectedWallet(null)
        // dispatch(logUserSuccess());
    }
    
    // Dropdown handle
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // Network check
    useEffect(() => {
        if (connected && network == 0) {
            alert('This dapp only works on Cardano Mainnet');
        }
    }, [connected, network]);
    
    return (
        <div>
            
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} // Dropdown
            >
                {connected && !connecting ?   (  // Connected
                    <div className='flex items-center h-[40px]'>
                        <div className='bg-[#FFFFFF] w-[46px] h-[40px] flex items-center rounded-l-lg'>
                            <Image
                                src={selectedWallet.icon}
                                alt={selectedWallet.name}
                                width='20'
                                height='20'
                                style={{ marginLeft: '4px' }}
                            />
                            <ExpandMoreIcon sx={{color:'black'}} className='relative right-1'/>
                        </div>
                        <div className='bg-[#123D91] w-[101px] py-2 rounded-r-lg text-[#FFFFFF]'><p>{lovelaceAssets.toFixed(0)} ₳</p></div>
                    </div>
                ) 
                : connecting ? ( // Connecting
                    <div className='flex items-center h-[40px]'>
                        <div className='bg-[#123D91] w-[147px] py-2 rounded-lg text-[#FFFFFF]'>Connecting</div>
                    </div>
                ) 
                
                : ( // Not Connected
                    <div className='flex items-center h-[40px]'>
                        <div className='bg-[#FFFFFF] w-[46px] py-2 rounded-l-lg'><ExpandMoreIcon sx={{color:'black'}} /></div>
                        <div className='bg-[#123D91] w-[101px] py-2 rounded-r-lg text-[#FFFFFF]'>Connect</div>
                    </div>
                )}
            </Button>
            {connected && !connecting ?   ( // Connected
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
                    <MenuItem onClick={handleDisconnect} sx={{
                            width: '147px',
                          }}>Disconnect</MenuItem>
                </Menu>
            ) 
            : connecting ? ( // Connecting
                <></>
            ) 
            
            : ( // Not Connected
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
                    {wallets.map((wallet, index) => (
                        <MenuItem sx={{
                            width: '147px',
                          }} key={index} onClick={() => handleWalletSelection(wallet)} >
                            
                            <Image
                                src={wallet.icon}
                                alt={wallet.name}
                                width='30'
                                height='30'
                                className='mr-2  relative right-2'
                            />
                            {wallet.name}
                        </MenuItem>
                    ))}
                </Menu>
            )}
            
    </div>
    )
}

export default ConnectWallet