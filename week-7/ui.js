import { calculateTotal, removeFromCart, cart } from './cart.js';

export function updateCartUI(cartData) {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalDiv = document.getElementById("cartTotal");

  cartItemsDiv.innerHTML = "";

  if(cartData.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty!</p>";
  } else {
    cartData.forEach((book, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <span>${book.title} - ₹${book.price}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });
  }

  // Event listeners for "Remove"
  cartItemsDiv.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      removeFromCart(idx);
      updateCartUI(cart);
    });
  });

  cartTotalDiv.textContent = `Total: ₹${calculateTotal()}`;
}
