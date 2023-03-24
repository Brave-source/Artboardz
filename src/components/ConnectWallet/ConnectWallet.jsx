import { useState, useEffect } from 'react'
import { useWallet, useWalletList, useLovelace, useNetwork } from '@meshsdk/react'
// import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import Dropdown from './Dropdown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ConnectWallet = () => {
    const { wallet, connected, connect, disconnect, connecting } = useWallet()
    const wallets = useWalletList()
    const lovelace = useLovelace();
    const [isOpen, setIsOpen] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)
    const network = useNetwork();
    const lovelaceAssets = parseInt(lovelace) / 1000000
    useEffect(() => {
        const storedWallet = localStorage.getItem('selectedWallet')
        if (storedWallet) {
            setSelectedWallet(JSON.parse(storedWallet))
            connect(JSON.parse(storedWallet).name)
        }
    }, [])

    const handleWalletSelection = (wallet) => {
        localStorage.setItem('selectedWallet', JSON.stringify(wallet))
        setSelectedWallet(wallet)
        connect(wallet.name)
        setIsOpen(false)
    }

    const handleDisconnect = () => {
        localStorage.removeItem('selectedWallet')
        disconnect()
        setSelectedWallet(null)
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
                        <div className='bg-[#123D91] w-[101px] py-2 rounded-r-lg text-[#FFFFFF]'><p>{lovelaceAssets.toFixed(2)} ₳</p></div>
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