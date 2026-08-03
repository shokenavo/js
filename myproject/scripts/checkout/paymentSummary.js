import { cart } from '../../data/cart-class.js';
import { products, getProduct } from '../../data/products.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary() {
  let html = '';
  html += `<div class="right-order-summary">Order Summary </div>
        <div class="payment-summary-row">
          <div>Items (${cart.getCartQuantity()}):</div>
          <div class="payment-summary-money">$${formatCurrency(productCost())}</div>
        </div>
        <div class="payment-summary-row">
          <div>Shipping & handling:</div>
          <div class="payment-summary-money">$${formatCurrency(getShipping())}</div>
        </div>
        <div class="payment-summary-row add-total">
          <div>Total before tax:</div>
          <div class="payment-summary-money border-one">$${formatCurrency(getTotalBeforeTax())}</div>
        </div>
        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(getTotalBeforeTax()/1000).toFixed(2)}</div>
        </div>
        <div class="payment-summary-row subtotal">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(getTotalBeforeTax() * 1.1)}</div>
        </div>
        <button class="place-your-order-button">Place your order</button>`


  document.querySelector('.js-payment-summary').innerHTML = html;



  function productCost() {
    let itemsCost = 0;
    cart.cartItems.forEach((cartItem) => {

      let matchItem = getProduct(cartItem.productId);
      itemsCost += (matchItem.priceCents * cartItem.quantity);

    });
    return itemsCost;
  }

  function getShipping() {
    let shipping = 0;
    cart.cartItems.forEach((cartItem) => {
      let deliveryOptionId = cartItem.deliveryOptionId;

      deliveryOptions.forEach((deliveryOption) => {
        if (deliveryOptionId === deliveryOption.id) {
          shipping += deliveryOption.priceCents;
        }
      })
    })
    return shipping;
  }
  function getTotalBeforeTax(){
    return productCost() + getShipping();
  }
  function orderTotal(){
    
  }
}



