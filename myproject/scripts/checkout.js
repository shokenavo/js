import { products } from "../data/products.js";
import { cart } from '../data/cart.js';
import {formatCurrency} from './utils/money.js'
let checkout_product = '';

cart.forEach((item) => {
  let selected_item;

  products.forEach((p_item) => {
    if (p_item.id === item.productId) {
      selected_item = p_item;
    }
  });


  checkout_product += `
          <div class="container-of-order">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>
          <div class="cart-item-detail-grid">
            <div class="div-order-picture">
              <img class="order-picture" src="${selected_item.image}">
            </div>
            <div class="cart-item-detail">
              <div class="item-name">${selected_item.name}</div>
              <div class="item-price">$${formatCurrency(selected_item.priceCents)}</div>
              <div class="item-number"><span>Quantity:<span class="quanity-label">${item.quantity}</span></span>
                <a class="updatelink">Update</a>
                <a class="deletelink">Delete</a>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              <div class="delivery-option">
                <input class="delivery-option-input" type="radio" name="day_${selected_item.id}" checked>
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input class="delivery-option-input" type="radio" name="day_${selected_item.id}">
                <div>
                  <div class="delivery-option-date">Wednesday, June 15</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input class="delivery-option-input" type="radio" name="day_${selected_item.id}">
                <div>
                  <div class="delivery-option-date">Monday, June 13</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

});


document.querySelector('.js-order-summary').innerHTML = checkout_product;
console.log(checkout_product);
