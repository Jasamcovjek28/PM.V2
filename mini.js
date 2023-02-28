document.addEventListener('DOMContentLoaded', () => {
  let config = {
    'username': {
      required: true,
      minlength: 5,
      maxlength: 28
    },
    
    'email': {
      required: true,
      email: true,
      minlength: 9,
      maxlength: 100
    },
    
    'password': {
      required: true,
      minlength: 8,
      maxlength: 30,
      matching: 'confirm_password'
    },
    
    'confirm_password': {
      required: true,
      minlength: 8,
      maxlength: 30,
      matching: 'password'
    }
  };
  
  let validator = new Validator(config, '#signup-box');
  
  document.querySelector('#signup-box').addEventListener('submit', e => {
    e.preventDefault();
    
    if(validator.validationPassed()) {
      let user = new User();
      user.username = document.querySelector('#username').value;
      user.email = document.querySelector('#email').value;
      user.password = document.querySelector('#password').value;
      user.create();
    } else {
      alert('Polja nisu dobro popunjena')
    }
  });
});
