let cartItems = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCountElement = document.getElementById('cart-count');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartButton = document.querySelector('.close');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalItemsElement = document.getElementById('total-items');
  const totalPriceElement = document.getElementById('total-price');

  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const product = {
        id: index + 1,
        name: button.parentElement.querySelector('h2').innerText,
        price: parseFloat(button.parentElement.querySelector('p').innerText.replace('$', '')),
        imageSrc: button.parentElement.querySelector('img').src
      };
      cartItems.push(product);
      updateCartUI();
    });
  });

  function updateCartUI() {
    cartCountElement.innerText = cartItems.length;
    totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    totalPriceElement.innerText = `₹${totalPrice.toFixed(2)}`;
    totalItemsElement.innerText = cartItems.length;

    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <img src="${item.imageSrc}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price.toFixed(2)}</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });
  }

  document.querySelector('.cart-icon').addEventListener('click', function() {
    cartOverlay.style.display = 'flex';
  });

  closeCartButton.addEventListener('click', function() {
    cartOverlay.style.display = 'none';
  });
});