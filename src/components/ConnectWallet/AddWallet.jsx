import React, { useState } from 'react';
import { Modal, Menu, MenuItem, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChevronRight } from '@mui/icons-material';

const AddWallet = ({ isOpen, setIsOpen }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const generateRandomString = () => {
    const randomString = Math.random().toString(36).substring(2, 14);
    return randomString;
  };

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const handleAddWalletClick = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[400px]">
        <h2 className="text-lg font-semibold mb-4 text-center">Connect Wallet</h2>
        <div className="flex justify-center mt-4">
          <Button
            variant="transparent w-full"
            onClick={handleAddWalletClick}
            id="add-wallet-button"
          >
            Add Wallet
            <div className="w-[160px]"></div>
            <ChevronRight className="w-6" />
          </Button>
        </div>

        <Menu
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorReference="anchorEl"
          anchorEl={document.getElementById('add-wallet-button')}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          className="ml-[170px] "
        >
          <MenuItem onClick={handleMenuClose}>Eternl</MenuItem>
          <MenuItem onClick={handleMenuClose}>Nami</MenuItem>
          <MenuItem onClick={handleMenuClose}>Flint</MenuItem>
        </Menu>

        <div className="h-[226px] overflow-y-auto">
          <ul className="list-inside">
            {[...Array(15)].map((_, index) => (
              <li
                key={index}
                className={`flex items-center mb-2 ${
                  selectedItem === index ? 'bg-blue-500' : ''
                }`}
                onClick={() => handleItemClick(index)}
              >
                <span className="text-gray-400 text-sm flex items-center w-full justify-between">
                  {generateRandomString()}
                  <DeleteIcon className="ml-2" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outlined" className="mr-2" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddWallet;
