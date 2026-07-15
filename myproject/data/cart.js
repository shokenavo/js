import {products} from '../data/products.js';

export let cart = [{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity : 1
  },{
  productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1

  }
];
export function addtocart(productid) {
    let matchItem;
    
    cart.forEach((cartItem) => {
      if (productid === cartItem.productid){
        matchItem = cartItem;
      }
    })

    if(matchItem){
      matchItem.quantity +=1;
    }else {
      cart.push({
        productid: productid,
        quantity:1
      })
    }
    
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
  console.log(cart);
};