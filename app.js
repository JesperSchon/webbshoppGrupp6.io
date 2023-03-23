document.addEventListener("DOMContentLoaded", function () {
    // Code for fetching products and displaying them in the product list on the index.html page
    const productsContainer = document.getElementById("product-list");
    if (productsContainer) {
      console.log("Fetching products...");
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((products) => {
          console.log("Products fetched:", products);
          products.forEach((product) => {
            const productCard = `
              <div class="col-md-4">
                <div class="card mb-4">
                  <img src="${product.image}" class="card-img-top" alt="${product.title}">
                  <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary order-button" data-product-id="${product.id}">Order now</button>
                  </div>
                </div>
              </div>`;
            productsContainer.innerHTML += productCard;
          });
  
          const orderButtons = document.querySelectorAll(".order-button");
          orderButtons.forEach((button) => {
            button.addEventListener("click", function (event) {
              const productId = event.target.dataset.productId;
              const product = products.find((p) => p.id === parseInt(productId, 10));
              localStorage.setItem(`product-${productId}`, JSON.stringify(product));
              window.location.href = `form.html?id=${productId}`;
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  
    // Code for handling form submission on the form.html page
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const productID = urlParams.get("id");
  
      orderForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const formData = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
        };
  
        localStorage.setItem(`form-data-${productID}`, JSON.stringify(formData));
        window.location.href = `confirmation.html?id=${productID}`;
      });
    }
  
    // Code for displaying the order details on the confirmation.html page
    const confirmationDetails = document.getElementById("confirmationDetails");
    const orderIDField = document.getElementById("orderID");
  
    if (confirmationDetails && orderIDField) {
      console.log("Confirmation details and order ID field detected");
      // Get the product ID from the query string in the URL
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const productID = urlParams.get("id");
      console.log("Product ID from URL:", productID);
  
      // Get the order details from localStorage using the updated key
      const orderDetails = JSON.parse(localStorage.getItem(`product-${productID}`));
      console.log("Order details from localStorage:", orderDetails);
  
      // Display the order details in the confirmation page
      const productCard = `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="${orderDetails.image}" class="card-img-top" alt="${orderDetails.title}">
            <div class="card-body">
              <h5 class="card-title">${orderDetails.title}</h5>
              <p class="card-text">${orderDetails.description}</p>
              <p class="card-text">$${orderDetails.price}</p>
            </div>
          </div>
        </div>`;
      confirmationDetails.innerHTML = productCard;
  
      // Generate a random order ID and display it
      const orderID = Math.floor(Math.random() * 1000000);
      orderIDField.innerHTML = orderID;
    }
  });
  
  