import { cart } from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import {getCartQuantity} from '../../data/cart.js';


export function renderPaymentSummary() {
  let html ='';
  html += `<div class="right-order-summary">Order Summary </div>
        <div class="payment-summary-row">
          <div>Items (${getCartQuantity()}):</div>
          <div class="payment-summary-money">$${productCost()}</div>
        </div>
        <div class="payment-summary-row">
          <div>Shipping & handling:</div>
          <div class="payment-summary-money">$4.99</div>
        </div>
        <div class="payment-summary-row add-total">
          <div>Total before tax:</div>
          <div class="payment-summary-money border-one">$47.74</div>
        </div>
        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$4.77</div>
        </div>
        <div class="payment-summary-row subtotal">
          <div>Order total:</div>
          <div class="payment-summary-money">$52.51</div>
        </div>
        <button class="place-your-order-button">Place your order</button>`


document.querySelector('.js-payment-summary').innerHTML = html;



function productCost() {
  let itemsCost = 0;
  cart.forEach((cartItem) => {

    let matchItem = getProduct(cartItem.productId);
    itemsCost += (matchItem.priceCents * cartItem.quantity);

  });
  return (itemsCost /100).toFixed(2);
}
}






