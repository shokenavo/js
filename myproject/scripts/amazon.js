
let html = ''
products.forEach((product) => {
  html += `
  <div class="product-container">
        <div class="grid-img-div"><img class="grid-img" src=${product.image}></div>
        <div class="nameof-product">${product.name}</div>
        <div class="rating"><img class="star-model-rate" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="rate-number">${product.rating.count}</div>
        </div>
        <div class="price-div">$${(product.priceCents / 100).toFixed(2)} </div>
        <select id="quantity" name="quantity">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div class="adding-button-div"><button class="adding-button js-add-to-cart" data-product-id = "${product.id}">Add to Cart</button></div>
      </div>`
})
document.querySelector('.js-grid-container').innerHTML = html;





document.querySelectorAll('.js-add-to-cart').forEach( (button)=> {
  button.addEventListener('click',()=> {
    const productid =button.dataset.productId;
    
    let matchItem;
    
    cart.forEach((x) => {
      if (productid === x.productid){
        matchItem = x;
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
    
    let cartQuantity =0;

    cart.forEach((item) =>{
      cartQuantity += item.quantity;
    })

    document.querySelector('.js-cart-number').innerHTML = 
    `<p class="cart-number-p">${cartQuantity}</p>`

    console.log(cart);
    console.log(cartQuantity);


    
    


  })
});



