import React, { useState } from "react";
import FormGroup from "./FormGroup";

function ProductQuantity({
  qt,
  formGroupClassName,
  conClassName,
  onQuantityChange,
  productId,
}) {
  const [quantity, setQuantity] = useState(qt || 1);

  const handleQuantity = (action) => {
    let newQuantity;
    switch (action) {
      case "+":
        newQuantity = quantity + 1;
        break;
      case "-":
        newQuantity = quantity - 1;
        break;
      default:
        newQuantity = parseInt(action, 10);
    }

    if (newQuantity >= 1 && newQuantity < 100) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);

      let cartProducts =
        JSON.parse(sessionStorage.getItem("cartProducts")) || [];
      let productInCart = cartProducts.find(
        (cartProduct) => cartProduct.id === productId
      );
      if (productInCart) {
        productInCart.quantity = newQuantity;
        sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        // Dispatch custom event to notify cart update
        const event = new Event("cartQuantityUpdated");
        window.dispatchEvent(event);
        console.log("cartProducts",cartProducts);
      }
    } else if (newQuantity < 1) {
      alert("min qty 1");
    } else if (newQuantity > 100) {
      alert("max qty 99");
    }
  };

  return (
    <div
      className={`form-group d-flex justify-content-center align-items-center ${conClassName}`}
    >
      <button
        className="btn py-0 px-2 lh-1 text-primary-secondary"
        type="button"
        onClick={() => handleQuantity("-")}
      >
        -
      </button>
      <FormGroup
        type="text"
        name="quantity"
        id="quantity"
        preventSpaces
        numOnly
        data-quantity="quantity"
        inputClassName="text-center cart-qty-field bg-none border-0 p-0"
        conClassName={`bg-none ${formGroupClassName}`}
        placeholder="1"
        value={quantity}
        onChange={(e) => {
          handleQuantity(e.target.value);
        }}
        min="1"
        max="100"
      />
      <button
        className="btn py-0 px-2 lh-1 text-primary-secondary"
        type="button"
        onClick={() => handleQuantity("+")}
      >
        +
      </button>
    </div>
  );
}

export default ProductQuantity;
