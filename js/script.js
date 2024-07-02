function toggleForms() {
  const formWrapper = document.getElementById("form-wrapper");
  formWrapper.classList.toggle("flipped");
}

function goToAdminPanel(event) {
  event.preventDefault();
  const login = document.querySelector(".form__input").value;
  const password = document.querySelector(".form__input").value;
  if (login === "admin" && password === "admin") {
    window.location.href = "admin.html";
  } else {
    alert("Неправильный логин или пароль");
  }
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
