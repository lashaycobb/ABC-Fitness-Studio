
/* ABC Fitness Studio JavaScript */

// SHOPPING CART
// Get saved cart items from SessionStorage.
function getCart() {
    return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Add a product to the cart.
function addToCart(name, price) {
    const cart = getCart();

    cart.push({
        name: name,
        price: price
    });

    sessionStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " has been added to your cart!");
}

// View the cart.
function viewCart() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your shopping cart is empty.");
        return;
    }

    let message = "Your Shopping Cart:\n\n";
    let total = 0;

    cart.forEach(function(item, index) {
        message += (index + 1) + ". " + item.name +
                   " - $" + item.price.toFixed(2) + "\n";
        total += item.price;
    });

    message += "\nTotal: $" + total.toFixed(2);

    alert(message);
}

// Clear the cart.
function clearCart() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your shopping cart is already empty.");
        return;
    }

    if (confirm("Are you sure you want to clear your cart?")) {
        sessionStorage.removeItem("cart");
        alert("Your shopping cart has been cleared.");
    }
}

// Process the order.
function processOrder() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty. Add items before processing an order.");
        return;
    }

    if (sessionStorage.getItem("orderProcessed") === "true") {
        alert("This order has already been processed.");
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price;
    });

    sessionStorage.setItem("orderProcessed", "true");

    alert("Your order has been processed!\nOrder total: $" +
          total.toFixed(2));

    sessionStorage.removeItem("cart");
}

// CONTACT FORM
// Save submitted contact information in LocalStorage.
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const contact = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                message: document.getElementById("message").value.trim()
            };

            const submissions =
                JSON.parse(localStorage.getItem("contactSubmissions")) || [];

            submissions.push(contact);

            localStorage.setItem(
                "contactSubmissions",
                JSON.stringify(submissions)
            );

            alert("Thank you! Your message has been submitted.");
            contactForm.reset();
        });
    }
});
