import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setCartData } from "../../reduxStore/appSlice";

function AddToCartBtn({ product, quantity }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state=> state.persistedReducer.app.cartData) || [];

  const handleAddToCart = () => {
    const updatedCartProducts = [...cartProducts];
    const productInCartIndex = updatedCartProducts.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );

    const validQuantity = quantity > 0 ? quantity : 1;
    if (productInCartIndex !== -1) {
        updatedCartProducts[productInCartIndex] = {
        ...updatedCartProducts[productInCartIndex],
        quantity: validQuantity,
      };
      const event = new Event("cartUpdatedAdd");
      window.dispatchEvent(event);
    } else {
      updatedCartProducts.push({
        id: product.id,
        quantity: validQuantity,
        product: product,
      });

      const event = new Event("cartAdd");
      window.dispatchEvent(event);
    }

    dispatch(setCartData(updatedCartProducts));
  };

  return (
    <button
      className="AddToCartBtn btn btn-primary btn-sm curved-border fw-semibold w-100 ms-sm-1 handleAddToCart"
      type="button"
      onClick={handleAddToCart}
    >
      Add
    </button>
  );
}

export default AddToCartBtn;
