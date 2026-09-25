// Week 2 — E-Commerce Product Script (Fixed & Enhanced)

const products = [
  { id: 1, name: "T-Shirt",   price: 19.99, emoji: "👕", tag: "Bestseller" },
  { id: 2, name: "Jeans",     price: 29.99, emoji: "👖", tag: "New Arrival" },
  { id: 3, name: "Watches",   price: 39.99, emoji: "⌚", tag: "Premium" },
  { id: 4, name: "Sneakers",  price: 49.99, emoji: "👟", tag: "Trending" }
];

let cartCount = 0;

const productList   = document.getElementById("product-list");
const cartCountEl   = document.getElementById("cart-count");
const cartToast     = document.getElementById("cart-toast");

// Render product cards
products.forEach(product => {
  const productEl = document.createElement("div");
  productEl.className = "product";
  productEl.innerHTML = `
    <div class="product-emoji">${product.emoji}</div>
    <div class="product-info">
      <span class="product-tag">${product.tag}</span>
      <h2>${product.name}</h2>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}')">🛒 Add to Cart</button>
    </div>
  `;
  productList.appendChild(productEl);
});

// Add to cart function with toast notification
let toastTimer;
function addToCart(name) {
  cartCount++;
  cartCountEl.textContent = cartCount;

  // Animate badge
  cartCountEl.parentElement.style.transform = 'scale(1.2)';
  setTimeout(() => { cartCountEl.parentElement.style.transform = 'scale(1)'; }, 200);

  // Show toast
  cartToast.textContent = `✅ ${name} added to cart!`;
  cartToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => cartToast.classList.remove("show"), 2500);
}