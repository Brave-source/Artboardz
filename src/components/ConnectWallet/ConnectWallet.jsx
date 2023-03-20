import { useState, useEffect } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
// import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { Button } from '@mui/material'
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
return (
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
    )
}

export default ConnectWallet