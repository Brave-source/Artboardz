import { useState, useEffect } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
// import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import Dropdown from './Dropdown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ConnectWallet = () => {
    const { wallet, connected, connect, disconnect, connecting } = useWallet()
    const wallets = useWalletList()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)

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
                        <div className='bg-[#FFFFFF] w-[46px] h-[40px] flex items-center'>
                            <Image
                                src={selectedWallet.icon}
                                alt={selectedWallet.name}
                                width='30'
                                height='30'
                                style={{ margin: 'auto' }}
                            />
                        </div>
                        <div className='bg-[#123D91] w-[147px] py-2'>Disconnect</div>
                    </div>
                ) 
                : connecting ? ( // Connecting
                    <div className='flex items-center h-[40px]'>
                        <div className='bg-[#123D91] w-[193px] py-2'>Connecting</div>
                    </div>
                ) 
                
                : ( // Not Connected
                    <div className='flex items-center h-[40px]'>
                        <div className='bg-[#FFFFFF] w-[46px] py-2'><ExpandMoreIcon /></div>
                        <div className='bg-[#123D91] w-[147px] py-2'>Connect</div>
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
                >
                    <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
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
                >
                    {wallets.map((wallet, index) => (
                        <MenuItem key={index} onClick={() => handleWalletSelection(wallet)}>
                            {wallet.name}
                            <Image
                                src={wallet.icon}
                                alt={wallet.name}
                                width='30'
                                height='30'
                            />
                        </MenuItem>
                    ))}
                </Menu>
            )}
    </div>
    )
}

export default ConnectWallet