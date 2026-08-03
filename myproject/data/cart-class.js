import { products } from '../data/products.js';
import { renderPaymentSummary } from '../scripts/checkout/paymentSummary.js';

export class Cart {
  #localStoragekey;
  constructor(localStoragekey){
    this.#localStoragekey = localStoragekey;
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey)) || [];
  }
  

  
  
  addToLocal() {
    localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));

  }

  addToCart(productId) {
    let matchItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchItem = cartItem;
      }
    })

    if (matchItem) {
      matchItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: String(Math.floor(Math.random() * 3) + 1)
      })
    }
    cart.addToLocal();
  }
  delete_cart_item(productId) {
    let new_cart = [];

    this.cartItems.forEach((cart_item) => {
      if (cart_item.productId !== productId) {
        new_cart.push(
          cart_item
        )
      }
    })

    this.cartItems = new_cart;
    cart.addToLocal();
    renderPaymentSummary();
  }
  getCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
  }
  setCartQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartitem) => {

      if (cartitem.productId === productId) {
        cartitem.quantity = newQuantity;
        this.addToLocal();
      }
    })
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchItem = cartItem;
      }
    })

    matchItem.deliveryOptionId = deliveryOptionId;
    this.addToLocal();
    renderPaymentSummary();
  }
}




export let cart = new Cart('cart-oop');











