'use strict';
let apiKey = 'keykieAZicRVteRKp';
/*
=========================================== PAGE INSCRIPTION ======================================
*/
function checkPasswords() {
  let password = document.getElementById('password').value;
  let passwordConf = document.getElementById('passwordConf').value;
  let submitBtn = document.getElementById('submitBtn');
  let error = document.getElementById('error');

  if (password !== passwordConf) {
    error.innerHTML = 'Passwords do not match';
    submitBtn.disabled = true;
  } else {
    error.innerHTML = '';
    submitBtn.disabled = false;
  }
}

if (document.URL.includes('register.html')) {
  console.log();

  let passwordInput = document.getElementById('password');
  let passwordConfInput = document.getElementById('passwordConf');
  passwordInput.addEventListener('input', checkPasswords);
  passwordConfInput.addEventListener('input', checkPasswords);

  var thisForm = document.getElementById('contactForm');
  const headers_ = {
    Authorization: 'Bearer ' + apiKey,
    'Content-Type': 'application/json',
  };

  thisForm.addEventListener('submit', function (event) {
    event.preventDefault();

    checkPasswords();
    if (!submitBtn.disabled) {
      fetch('https://api.airtable.com/v0/appDaIOPzRpXiYeF2/Table%201', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            username: document.querySelector('#Name').value,
            email: document.querySelector('#EmailAddress').value,
            password: document.querySelector('#password').value,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('success!');
          Cookies.set('username', document.querySelector('#Name').value, {
            expires: 7,
          });
          window.location.href = 'home.html';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}

/*
=========================================== PAGE LOGIN ======================================
*/
if (document.URL.includes('login.html')) {
  console.log(window.location.href);
  // Get the login form
  const loginForm = document.getElementById('loginForm');

  // When the form is submitted...
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the user's input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a GET request to the Airtable API to retrieve the data
    fetch('https://api.airtable.com/v0/appDaIOPzRpXiYeF2/Table%201', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the username and password match the data in the Airtable
        const records = data.records;
        let match = false;
        records.forEach((record) => {
          if (
            record.fields.username === username &&
            record.fields.password === password
          ) {
            match = true;
          }
        });

        // If the username and password match, redirect the user to the home page
        if (match) {
          Cookies.set('username', username, { expires: 7 });
          window.location.href = 'home.html';
        } else {
          alert('Incorrect username or password. Please try again.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
