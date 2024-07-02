if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify([]));
}

const PRODUCTS = JSON.parse(localStorage.getItem("products"));

let USERNAME = localStorage.getItem("username");
if (!USERNAME) {
  USERNAME = "admin";
  localStorage.setItem("username", USERNAME);
}

const adminName = document.querySelector(".header__admin-name");
adminName.textContent = USERNAME;

function showProducts() {
  const productsList = document.querySelector(".product-list");
  productsList.innerHTML = "";
  PRODUCTS.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-list__item");
    productItem.innerHTML = `
      <span class="product-list__name">${product.name}</span>
      <span class="product-list__price">${product.price} ₽</span>
      <span class="product-list__quantity">${product.quantity}</span>
      <span onclick="removeProduct('${product.name}')" class="product-list__remove">X</span>
    `;
    productsList.appendChild(productItem);
  });
}

function saveProduct(event) {
  event.preventDefault();
  const modalContent = document.querySelector(".modal__content");
  const productName = document.getElementById("product-name").value;
  const productQuantity = document.getElementById("product-quantity").value;
  const productPrice = document.getElementById("product-price").value;
  const modalError = document.querySelector(".modal__error");
  const product = {
    name: productName,
    quantity: productQuantity,
    price: productPrice,
  };
  if (isProductInList(productName)) {
    modalError.textContent = "Такой продукт уже существует";
    modalError.style.display = "block";
    setTimeout(() => {
      modalError.style.display = "none";
    }, 3000);
  } else {
    modalContent.reset();
    PRODUCTS.push(product);
    localStorage.setItem("products", JSON.stringify(PRODUCTS));
    toggleAddProductModal(false);
    showProducts();
  }
}

function removeProduct(productName) {
  PRODUCTS.forEach((product, index) => {
    if (product.name === productName) {
      PRODUCTS.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(PRODUCTS));
      showProducts();
    }
  });
}

function isProductInList(productName) {
  let isProductInList = false;
  PRODUCTS.forEach((product) => {
    if (product.name === productName) {
      isProductInList = true;
    }
  });
  return isProductInList;
}

function toggleAddProductModal(isOpen) {
  const modal = document.getElementById("addProductModal");
  if (isOpen) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

const addProductButton = document.getElementById("add-product");

const closeModalButton = document.getElementById("close-modal");

addProductButton.onclick = function () {
  toggleAddProductModal(true);
};

closeModalButton.onclick = function () {
  toggleAddProductModal(false);
};

const adminAvatar = document.querySelector(".header__admin-avatar");
adminAvatar.onclick = function () {
  const logOutButton = document.querySelector(".button--logout");
  logOutButton.style.display = "block";
};

window.addEventListener("click", function (event) {
  if (!event.target.matches(".header__admin-avatar")) {
    const logOutButton = document.querySelector(".button--logout");
    logOutButton.style.display = "none";
  }
});

function logout() {
  window.location.href = "index.html";
}

showProducts();
