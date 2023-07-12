import React from "react";

const Card = ({ children }) => {
  return <div 
        style={{
            border: "1px solid transparent", 
            borderRadius: '5px', 
            boxShadow: 'var(--boxShadow)', 
            overflow: "hidden"
            }} 
    >
        {children}
    </div>;
};

export default Card;
  
