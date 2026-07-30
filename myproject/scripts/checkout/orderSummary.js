import { products, getProduct } from '../../data/products.js';
import { cart, delete_cart_item, getCartQuantity, setCartQuantity, updateDeliveryOption } from '../../data/cart.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';




createContainer();



// this part makes container of container in checkout
export function createContainer() {
  let checkout_product = '';
  cart.forEach((item) => {

    let selected_item = getProduct(item.productId)

    let timeString;
    deliveryOptions.forEach((deliveryOption) => {

      let deliveryDate;
      if (deliveryOption.id === item.deliveryOptionId) {
        deliveryDate = deliveryOption.deliveryDays
      } else return;
      let today = dayjs();
      let deliverytime = today.add(
        deliveryDate, 'days'
      );
      timeString = deliverytime.format('dddd, MMMM D');

    })

    checkout_product += `
          <div class="container-of-order 
          js-container-of-order-${selected_item.id}">
          <div class="delivery-date">Delivery date: ${timeString}</div>
          <div class="cart-item-detail-grid">
            <div class="div-order-picture">
              <img class="order-picture" src="${selected_item.image}">
            </div>
            <div class="cart-item-detail">
              <div class="item-name">${selected_item.name}</div>
              <div class="item-price">$${formatCurrency(selected_item.priceCents)}</div>
              <div class="item-number-${selected_item.id}"><span>Quantity:<span class="quantity-label js-quantity-lable-${selected_item.id}">${item.quantity}</span></span>
                <a class="updatelink js-update-link" data-update-link = ${selected_item.id}>Update</a>
                <input type="number" class="quantity-input js-quantity-input-${selected_item.id}" value="${item.quantity}" data-input-item= "${selected_item.id}">
                <span class= "save-quantity-link link-primary" data-save-link = ${selected_item.id}>Save</span>
                <a class="deletelink js-delete-button" data-delete-button = "${selected_item.id}">Delete</a>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${deliveryOptionHTML(selected_item, item)}
            </div>
          </div>
        </div>`;

  });
  document.querySelector('.js-order-summary').innerHTML = checkout_product;
  // it says what happens when an input is clicked



  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener(('click'), () => {
      let productId = element.dataset.productId;
      let deliveryOptionId = element.dataset.deliveryOption;
      updateDeliveryOption(productId, deliveryOptionId);
      createContainer();

    });
  });

  function deliveryOptionHTML(selected_item, cartItem) {




    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      let deliveryDate = isWeekend(deliveryOption);
      let dataString = deliveryDate.format('dddd , MMMM D');

      
      let deliveryPrice = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;



      html += `<div class="delivery-option js-delivery-option" data-delivery-option = "${deliveryOption.id}" data-product-id = "${selected_item.id}" >
        <input ${isChecked ? 'checked' : ''} class="delivery-option-input" type="radio" name="day_${selected_item.id}">
        <div>
          <div class="delivery-option-date">${dataString}</div>
          <div class="delivery-option-price">${deliveryPrice} Shipping</div>
        </div>
      </div>`

    });
    return html;

  }






  // this does remove of container 
  function removeProductFromPage(productId) {
    const container = document.querySelector(`.js-container-of-order-${productId}`);

    container.remove();
    checkoutHeaderQuantity();
  }



  // this part make delete button works
  document.querySelectorAll('.js-delete-button').forEach((item) => {
    item.addEventListener('click', () => {
      const productId = item.dataset.deleteButton;
      delete_cart_item(productId);
      removeProductFromPage(productId);
    })
  })





  //it gives the number of items AND makes header  and checkout-header
  function checkoutHeaderQuantity() {
    let cartQuantity = 0;


    cartQuantity = getCartQuantity();


    let checkout_header = ``;
    checkout_header += ` <div class="middle-of-header">
      <div class="left-of-middle">
        <a class="logo-of-header" href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile.png">
        </a>
      </div>
      <div class="middle-of-middle">
        Checkout(<a class="items-of-checkout" href="amazon.html">${cartQuantity} items</a>)
      </div>
      <div class="right-of-middle">
        <img class="checkout-logo-icon" src="images/checkout-lock-icon.png">
      </div>
    </div>
`;
    document.querySelector('.js-checkout-header').innerHTML = checkout_header;
  }
  checkoutHeaderQuantity();



  //this part interactive update link 
  document.querySelectorAll('.js-update-link').forEach((update_link) => {
    update_link.addEventListener('click', () => {
      let productId = update_link.dataset.updateLink;

      let parent_div = document.querySelector(`.item-number-${productId}`);
      parent_div.classList.add('is-editing-quantity');
      changeCartQuantity();
    })
  })




  // this part upadte quantity to what we save later, it gives our input
  let changeCartQuantity = function () {

    document.querySelectorAll('.link-primary').forEach((save_link) => {

      let productId = save_link.dataset.saveLink;
      save_link.addEventListener('click', () => {
        saveQuantity(productId);


      })
    })
  }
  let saveQuantity = function (productId) {
    let entered_quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);


    if (entered_quantity < 0 || !Number.isInteger(entered_quantity)) {
      alert('not valid input');
      return;
    }
    if (entered_quantity === 0) {

      delete_cart_item(productId);
      removeProductFromPage(productId);
      return;
    }

    setCartQuantity(productId, entered_quantity);
    checkoutHeaderQuantity();
    renderPaymentSummary();
    document.querySelector(`.js-quantity-lable-${productId}`).innerHTML = entered_quantity;
    let parent_div = document.querySelector(`.item-number-${productId}`);
    parent_div.classList.remove('is-editing-quantity');
  }
  function makeEnterSaves() {
    document.querySelectorAll('.quantity-input').forEach((input_item) => {
      input_item.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
          let productId = input_item.dataset.inputItem;
          saveQuantity(productId);
        }
      })

    })

  }
  makeEnterSaves();

  function isWeekend(deliveryOption) {
    let today = dayjs();
    let deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    let date = deliveryDate.format('dddd');
    if (date === 'Sunday') {
      date = 1;
    }
    else if (date === 'Saturday') {
      date = 0;
    }
    else date = 2;

    if (date === 0) {
      deliveryDate = today.add(
        ((deliveryOption.deliveryDays) + 2), 'days'
      );
    } else if (date === 1) {
      deliveryDate = today.add(
        ((deliveryOption.deliveryDays) + 1), 'days'
      );
    }
    return deliveryDate;
  }
}