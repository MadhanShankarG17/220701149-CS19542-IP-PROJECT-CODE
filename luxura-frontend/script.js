const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Image Zoom on Hover
document.querySelectorAll('.pro img').forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = "scale(1.1)";
        this.style.transition = "transform 0.5s ease";
    });
    img.addEventListener('mouseout', function() {
        this.style.transform = "scale(1)";
    });
});

// Dynamic Cart Counter


// Back to Top Button
let backToTopButton = document.createElement('button');
backToTopButton.innerHTML = "↑";
backToTopButton.classList.add("back-to-top");
document.body.appendChild(backToTopButton);

window.onscroll = function() {
    if (document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Light/Dark Mode Switch
const toggleSwitch = document.querySelector('.dark-mode-toggle');
toggleSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Handling "Add to Cart" button click in singleProduct.html
// Handling "Add to Cart" button click in singleProduct.html
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const productName = document.querySelector('.single-pro-details h4').innerText;
    const productPrice = parseFloat(document.querySelector('.single-pro-details h2').innerText.replace('₹', ''));
    const productSize = document.querySelector('.single-pro-details select').value;
    const productQuantity = parseInt(document.querySelector('.single-pro-details input[type="number"]').value);

    if (productSize === "Select Size") {
        alert("Please select a size.");
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        size: productSize,
        quantity: productQuantity,
        subtotal: productPrice * productQuantity
    };

    // Save product to localStorage (as cart data)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
    updateCartIcon(cart.length); // Update cart icon quantity
});

// Function to update cart icon quantity
function updateCartIcon(count) {
    const cartBadge = document.getElementById('lg-bag');
    cartBadge.innerHTML = `<i class="far fa-shopping-bag"></i><span>${count}</span>`;
}

// On cart.html page load, display cart items from localStorage
window.addEventListener('load', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartSubtotal = 0;

    cart.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        cartSubtotal += itemSubtotal;

        const cartItemRow = `
            <tr>
                <td><a href="#" onclick="removeItem(${index})"><i class="fas fa-times-circle"></i></a></td>
                <td><img src="images/products/f1.jpg" alt=""></td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td><input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}"></td>
                <td class="subtotal">₹${itemSubtotal}</td>
            </tr>
        `;
        cartItemsContainer.innerHTML += cartItemRow;
    });

    document.getElementById('cart-subtotal').innerText = `₹${cartSubtotal}`;
    document.getElementById('cart-total').innerText = `₹${cartSubtotal}`;

    // Add event listeners to quantity input fields for real-time subtotal calculation
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
});

// Update item quantity and subtotal
function updateQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const newQuantity = parseInt(event.target.value);
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity = newQuantity;
    cart[index].subtotal = cart[index].price * newQuantity;

    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh cart display
    location.reload();
}

// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh cart display
    location.reload();
}

// On checkout, send the cart data to the server
document.getElementById('checkout-btn').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    fetch('http://localhost:5002/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Checkout successful!");
        } else {
            alert("Checkout failed. Please try again.");
        }
    })
    .catch(error => console.error('Error:', error));
});
