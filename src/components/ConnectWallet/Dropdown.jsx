import React from 'react'


const Dropdown = ({ title, children }) => {
    return (
        <div className='dropdown'>
            <div className='dropdownbutton'>{title}</div>
            <div className='dropdowncontent'>{children}</div>
        </div>
    )
}

export default Dropdown 