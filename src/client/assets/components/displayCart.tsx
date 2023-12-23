import React from "react";
import type { Item } from "./interfaces";

interface CartProps {
  data: Item[];
  handleDisplayCart: () => void;
}

const DisplayCart: React.FC<CartProps> = ({ data, handleDisplayCart }) => {
  return (
    <div className="card-modal">
      smth
      {data.map((item) => (
        <div key={item.id + "-modal"} className="cart-item">
          {item.title}
        </div>
      ))}
      <button onClick={handleDisplayCart}>Close</button>
    </div>
  );
};

export default DisplayCart;
