if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

const USERS = JSON.parse(localStorage.getItem("users"));

function toggleForms() {
  const formWrapper = document.getElementById("form-wrapper");
  formWrapper.classList.toggle("flipped");
}

function goToAdminPanel(event) {
  event.preventDefault();
  const loginElement = document.getElementById("login-input");
  const passwordElement = document.getElementById("password-input");
  const errorLogin = document.querySelector(".form__error");
  const login = loginElement.value;
  const password = passwordElement.value;
  if (
    USERS.some((user) => user.login === login && user.password === password) ||
    (login === "admin" && password === "admin")
  ) {
    errorLogin.textContent = "";
    loginElement.style.border = "1px solid #ccc";
    passwordElement.style.border = "1px solid #ccc";
    window.location.href = "admin.html";
    localStorage.setItem("username", login);
  } else {
    loginElement.style.border = "1px solid red";
    passwordElement.style.border = "1px solid red";
    errorLogin.textContent = "Логин или пароль неверный";
  }
}

function registerUser(event) {
  event.preventDefault();
  const loginElement = document.getElementById("register-login-input");
  const passwordElement = document.getElementById("register-password-input");
  const login = loginElement.value;
  const password = passwordElement.value;
  USERS.push({
    login,
    password,
  });
  localStorage.setItem("users", JSON.stringify(USERS));
  toggleForms();
}
