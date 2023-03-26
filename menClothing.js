document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("product-list");
  if (productsContainer) {
    console.log(`Fetching products...`);
    const category = "men's clothing";
    const url = `https://fakestoreapi.com/products/category/${category}`;
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        console.log("Products fetched:", products);
        products.forEach((product) => {
          const productCard = `
          <div class="col-md-4">
            <div class="card mb-4">
              <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
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
});

