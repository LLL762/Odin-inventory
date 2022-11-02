const logOutBtn = document.getElementById("log-out-btn");
const logInBtn = document.getElementById("log-in-btn");

const logOut = () => {
  fetch("http://localhost:3000/logout", {
    method: "DELETE",
  }).catch((err) => console.log(err));
};

const goToLogIn = () => {
  window.location = "http://localhost:3000/login";
};

logOutBtn?.addEventListener("click", logOut);
logInBtn?.addEventListener("click", goToLogIn);
