document.addEventListener("DOMContentLoaded", function () {
  // Code for fetching products and displaying them in the product list on the index.html page
  const productsContainer = document.getElementById("product-list");
  if (productsContainer) {
    console.log(`Fetching products...`);
    const category1 = "men's clothing";
    const category2 = "women's clothing";
    const category3 = "jewelery";
    const category4 = "electronics";
    const url1 = `https://fakestoreapi.com/products/category/${category1}`;
    const url2 = `https://fakestoreapi.com/products/category/${category2}`;
    const url3 = `https://fakestoreapi.com/products/category/${category3}`;
    const url4 = `https://fakestoreapi.com/products/category/${category4}`;
    Promise.all([fetch(url1), fetch(url2), fetch(url3), fetch(url4)])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((categories) => {
        const products = categories[0].concat(categories[1]).concat(categories[2]).concat(categories[3]);
        console.log("Products fetched:", products);
        products.forEach((product) => {
          const productCard = `
          <div class="col-md-4">
            <div class="card mb-4">
              <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text short-description">${product.description}</p>
                <button class="btn btn-link read-more">Read More</button>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-primary order-button" data-product-id="${product.id}">Order now</button>
              </div>
            </div>
          </div>`;
          
          // ... existing code ...

          productsContainer.innerHTML += productCard;
        });

        const readMoreButtons = document.querySelectorAll(".read-more");
readMoreButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const shortDescription = event.target.previousElementSibling;
    shortDescription.classList.toggle("short-description");

    if (event.target.textContent === "Read More") {
      event.target.textContent = "Read Less";
    } else {
      event.target.textContent = "Read More";
    }
  });
});


        const orderButtons = document.querySelectorAll(".order-button");
        orderButtons.forEach((button) => {
          button.addEventListener("click", function (event) {
            const productId = event.target.dataset.productId;
            const product = products.find(
              (p) => p.id === parseInt(productId, 10)
            );
            localStorage.setItem(
              `product-${productId}`,
              JSON.stringify(product)
            );
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
const formDetails = document.getElementById("formDetails");
const orderIDField = document.getElementById("orderID");

if (confirmationDetails && formDetails && orderIDField) {
  console.log("Confirmation details, form details, and order ID field detected");
  // Get the product ID from the query string in the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productID = urlParams.get("id");
  console.log("Product ID from URL:", productID);

  // Get the order details from localStorage using the updated key
  const orderDetails = JSON.parse(localStorage.getItem(`product-${productID}`));
  console.log("Order details from localStorage:", orderDetails);

// Display the customer details in the confirmation page
const formData = JSON.parse(localStorage.getItem(`form-data-${productID}`));
/*const customerDetails = `
    <div class="col-md-4">
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Customer Details</h5>
          <p class="card-text">Name: ${formData.firstName} ${formData.lastName}</p>
          <p class="card-text">Email: ${formData.email}</p>
          <p class="card-text">Phone: ${formData.phone}</p>
          <p class="card-text">Address: ${formData.address}</p>
        </div>
      </div>
    </div>`;*/

  // Display the order details in the confirmation page
  const productCard = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${orderDetails.image}" class="card-img-top" alt="${orderDetails.title}">
          <div class="card-body">
          <h5 class="card-title"> product: </h5>
          <p class="card-text"> ${orderDetails.title}</p>
          <h5 class="card-title">Customer Details</h5>
            <p class="card-text">Name: ${formData.firstName} ${formData.lastName} </p>
            <p class="card-text">Email: ${formData.email}</p>
            <p class="card-text">Phone: ${formData.phone}</p>
            <p class="card-text">Adress: ${formData.address}</p>
          </div>
        </div>
      </div>`;
  confirmationDetails.innerHTML = productCard;
  formDetails.innerHTML = customerDetails;

  // Generate a random order ID and display it
  const orderID = Math.floor(Math.random() * 1000000);
  orderIDField.innerHTML = orderID;

    
  }
});

// limitations on the fname input
var nameinput= document.getElementById("firstName");
nameinput.setAttribute('minlength',2);
nameinput.setAttribute('maxlength',50);
nameinput.setAttribute('required',true);

// limitations on the Lname input
var lnameinput= document.getElementById("lastName");
lnameinput.setAttribute('minlength',2);
lnameinput.setAttribute('maxlength',50);
lnameinput.setAttribute('required',true);

// limitations on the email input
var emailinput= document.getElementById("email");
emailinput.setAttribute('minlength',2);
emailinput.setAttribute('maxlength',50);
emailinput.setAttribute('required',true);
emailinput.setAttribute('type','email');

// limitations on the phone input
var phoneinput= document.getElementById("phone");
phoneinput.setAttribute('min',13);
phoneinput.setAttribute('max',50);
phoneinput.setAttribute('required',true);
phoneinput.setAttribute('type','number');