import { useState, useEffect } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
// import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import Dropdown from './Dropdown'

const ConnectWallet = () => {
    const { wallet, connect, disconnect, connecting } = useWallet()
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

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

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

    

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  


    return (
        <>
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {selectedWallet ? (
                    <div className='flex'>
                        <div className='bg-orange-500'>logo</div>
                        <div className='bg-emerald-400'>balance</div>
                    </div>
                ) : connecting ? (
                    <div>Connecting</div>
                ) : (
                    <div>Connect</div>
                )}
            </Button>
                {selectedWallet ? (
                    <div className='flex'>
                        <div className='bg-orange-500'>logo</div>
                        <div className='bg-emerald-400'>balance</div>
                    </div>
                ) : connecting ? (
                    <div>Connecting</div>
                ) : (
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {wallets.map((wallet, index) => {
                            <MenuItem key={index} onClick={() => handleWalletSelection(wallet)}>
                                dandjna
                                {wallet.name}
                                <Image
                                    src={wallet.icon}
                                    alt={wallet.name}
                                    width='30'
                                    height='30'
                                />
                            </MenuItem>
                        })}
                    </Menu>
                )}
        </div>





        <Dropdown
            title={
                <Button >
                    {selectedWallet ? (
                        <div className='flex-gap'>
                            <span>{selectedWallet.name}</span>
                            <Image
                                src={selectedWallet.icon}
                                alt={selectedWallet.name}
                                width='30'
                                height='30'
                            />
                        </div>
                    ) : connecting ? (
                        'Connecting'
                    ) : (
                        <div>
                            <div>Connect</div>

                            {/* <BsChevronDown size={25} /> */}
                        </div>
                    )}
                </Button>
            }
        >
            <div className='connect-wallet'>
                {!selectedWallet && !connecting && (
                    <ul>
                        {wallets.map((wallet) => (
                            <li
                                key={wallet.name}
                                onClick={() => handleWalletSelection(wallet)}
                            >
                                <span className='dropdown-button__wallet-name'>
                                    {wallet.name}   
                                </span>
                                <Image
                                    src={wallet.icon}
                                    alt={wallet.name}
                                    width='30'
                                    height='30'
                                />
                            </li>
                        ))}
                    </ul>
                )}
                {selectedWallet && (
<div className='connect-wallet__disconnect'>
                        <Button variant='outline' onClick={handleDisconnect} noShadow>
                            Disconnect
                        </Button>
                    </div>
                )}
            </div>
        </Dropdown>
        </>
    )
}

export default ConnectWallet