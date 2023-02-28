class User {
  user_id = '';
  username = '';
  email = '';
  password = '';
  api_url = 'https://63fb27534e024687bf72db88.mockapi.io';
  
  checkExistence() {
    // Check if the email or username already exist in the API
    return fetch(`${this.api_url}/users?email=${this.email}&username=${this.username}`)
      .then(response => response.json())
      .then(data => {
        // If the email or username already exist, return false
        return data.length === 0;
      })
  }
  
  get(user_id) {
      let api_url = this.api_url + '/users/' + user_id;
      
      fetch(api_url)
      .then(response => response.json())
      .then(data => {
          
      })
  }
  
  create() {
    // Check if the email or username already exist
    this.checkExistence()
      .then(exists => {
        if (exists) {
          let data = {
            username: this.username,
            email: this.email,
            password: this.password
          }

          data = JSON.stringify(data);

          fetch(`${this.api_url}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: data
          })
          .then(response => response.json())
          .then(data => {
            window.location.href = 'vutra.html';
          })
        } else {
          alert('The email or username already exists. Please choose another one.');
        }
      })
  }
}
