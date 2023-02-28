class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login() {
    // Code for logging in user
  }

  logout() {
    // Code for logging out user
  }
}

const api_url = "https://63fb27534e024687bf72db88.mockapi.io";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(api_url + "/users?username=" + username)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const user = data[0];
        if (user.password === password) {
          window.location.href = "kosovo.html";
        } else {
          alert("Incorrect password.");
        }
      } else {
        alert("User not found.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while trying to login.");
    });
}

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", login);
