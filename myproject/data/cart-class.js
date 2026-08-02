import { products } from '../data/products.js';
import { renderPaymentSummary } from '../scripts/checkout/paymentSummary.js';
class Cart {
  #localStoragekey;
  constructor(localStoragekey){
    this.#localStoragekey = localStoragekey;
  }
  

  cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey)) || [];
  
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




const cart = new Cart('cart-oop');
const business = new Cart('businessCart');

cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
business.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

console.log(cart);
console.log(business);










