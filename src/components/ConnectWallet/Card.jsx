import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children, cardClass }) => {
  return <div 
        style={{
            border: "1px solid transparent", 
            borderRadius: '5px', 
            boxShadow: 'var(--boxShadow)', 
            overflow: "hidden"
            }} 
        className={`${styles.card} ${cardClass}`}
    >
        {children}
    </div>;
};

export default Card;

// card {
//     border: 1px solid transparent;
//     border-radius: 5px;
//     box-shadow: var(--box-shadow);
//     overflow: hidden;
//   }
  
