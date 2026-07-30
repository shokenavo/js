import { products } from '../data/products.js';
import {renderPaymentSummary} from '../scripts/checkout/paymentSummary.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [];


//it saves cart eachtime we runs it
function addToLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));

}
// this runs when we press add to cart button and adds to cart 
export function addtocart(productId) {
  let matchItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchItem = cartItem;
    }
  })

  if (matchItem) {
    matchItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId : String(Math.floor(Math.random() * 3 ) + 1)
})
  }
  addToLocal();
};
// this deletes form cart and makes new array , updates cart
export function delete_cart_item(productId) {
  let new_cart = [];

  cart.forEach((cart_item) => {
    if (cart_item.productId !== productId) {
      new_cart.push(
        cart_item
      )
    }
  })

  cart = new_cart;
  addToLocal();
  renderPaymentSummary();
};
//this part calculate total of cartQuantity in different scripts
export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
};
// this part makes cart products quantity update;
export function setCartQuantity(productId, newQuantity) {
  cart.forEach((cartitem) => {
    
    if (cartitem.productId === productId) {
      cartitem.quantity = newQuantity;
      addToLocal();
    }
  })
};

// it changes the carts items deliveryoption 
export function updateDeliveryOption(productId , deliveryOptionId){
  let matchItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchItem = cartItem;
    }
  })

  matchItem.deliveryOptionId = deliveryOptionId;
  addToLocal();
  renderPaymentSummary();
}