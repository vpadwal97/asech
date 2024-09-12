import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RemoveFromCartBtn({ id }) {
  const dispatch = useDispatch();
  // const cartProducts = useSelector(state=> state.persistedReducer.app.cartData) || [];
  const [cartProducts,setCartProducts] = useState([]);

  const handleRemoveFromCart = () => {
    const updatedCartProducts = cartProducts.filter(cartProduct => cartProduct.id !== id);
    
    // dispatch(setCartData(updatedCartProducts));
    
    // Dispatch custom event to notify cart update
    const event = new Event("cartUpdatedRemove");
    window.dispatchEvent(event);
  };

  return (
    <button
      className="RemoveFromCartBtn btn btn-close fw-semibold font-10 p-0"
      type="button"
      onClick={handleRemoveFromCart}
    >
    </button>
  );
}

export default RemoveFromCartBtn;
