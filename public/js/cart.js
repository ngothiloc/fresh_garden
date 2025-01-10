let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get the cart from localStorage or initialize as an empty array

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll("#add-to-cart-button");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Get product data from the clicked button's parent elements
      const product = {
        id: this.getAttribute("data-product-id"),
        name: this.closest(".card-body").querySelector("h2").textContent.trim(),
        price: parseFloat(this.closest(".card-body").querySelector(".text-dark").textContent.replace(/[^0-9.-]+/g, "")),
        image: this.closest(".card-body").querySelector("img").src,
        quantity: 1, // Default quantity to 1
      };

      addToCart(product); // Add the product to the cart
    });
  });

  // Update the cart UI when the page loads
  updateCartUI();
});

// Hiển thị thông báo thêm sản phẩm vào giỏ hàng
function showAddToCartNotification() {
  const notification = document.createElement('div');
  notification.id = 'add-to-cart-notification';
  notification.textContent = 'Bạn đã thêm 1 sản phẩm vào giỏ hàng';

  // Thêm thông báo vào body
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// Add product to cart
function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id); // Check if the product is already in the cart
  if (existingProduct) {
    existingProduct.quantity++; // If so, increment the quantity
  } else {
    cart.push(product); // Otherwise, add the new product
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Store the updated cart in localStorage
  updateCartUI(); // Update the cart UI
  showAddToCartNotification(); // Show the notification
}

// Update the cart UI
function updateCartUI() {
  const cartList = document.querySelector(".list-group");
  if (!cartList) return; // If there's no cart list element, exit

  cartList.innerHTML = ""; // Clear the current cart list
  cart.forEach(item => {
    const cartItemHTML = `
      <li class="list-group-item py-3 ps-0 border-bottom">
        <div class="row align-items-center">
          <div class="col-6 col-md-6 col-lg-6">
            <div class="d-flex">
              <img src="${item.image}" alt="${item.name}" class="icon-shape icon-xxl" />
              <div class="ms-3">
                <h6 class="mb-0">${item.name}</h6>
                <span class="text-muted">Price: ${formatPrice(item.price)}</span>
                <div class="small">
                  <button
                    onclick="removeFromCart('${item.id}')"
                    class="text-decoration-none text-inherit border-0 bg-white"
                  >
                    <span class="me-1 align-text-bottom">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-trash-2 text-success"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </span>
                    <span class="text-muted">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 col-md-3 col-lg-2">
            <input type="number" class="form-control" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)" />
          </div>
          <div class="col-4 text-end">
            <span>${formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
      </li>`;
    cartList.insertAdjacentHTML("beforeend", cartItemHTML); // Insert each product into the cart UI
  });
}
// Update product quantity in the cart
function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = parseInt(newQuantity, 10);
    if (product.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId); // Remove product if quantity is 0 or less
    }
    localStorage.setItem("cart", JSON.stringify(cart)); // Store the updated cart in localStorage
    updateCartUI(); // Update the cart UI
  }
}

// Remove product from cart
function removeFromCart(productId) {
  // Remove product from cart array
  cart = cart.filter(item => item.id !== productId);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart UI
  updateCartUI();
}

// Format price to VND currency
function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
  return `${formattedPrice}.000`;
}