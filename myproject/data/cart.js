import {products} from '../data/products.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [];



function addToLocal(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId) {
    let matchItem;
    
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchItem = cartItem;
      }
    })

    if(matchItem){
      matchItem.quantity +=1;
    }else {
      cart.push({
        productId: productId,
        quantity:1
      })
    }
    addToLocal();
};
export function delete_cart_item(productId){
  let new_cart =[];

  cart.forEach((cart_item)=>{
    if (cart_item.productId !== productId){
      new_cart.push(
        cart_item
      )
    }
  })

  cart = new_cart;
  addToLocal();
};