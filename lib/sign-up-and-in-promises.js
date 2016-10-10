'use strict';

const http = require('http');

const formData = JSON.stringify({
  credentials: {
    email: process.argv[2],
    password: process.argv[3],
  },
});

const onError = (error) => {
  if (typeof error === 'object' &&
      error.response) {
    console.error(error.response.statusCode, error.response.statusMessage);
    console.error(error.data);
  } else {
    console.error(error.stack);
  }
};

const onSignIn = (response) => {
  console.log(response);
  console.log('Signed in');
};

const onSignUp = (response) => {
  console.log(response);
  console.log('Signed up');
};

const baseOptions = {
  hostname: 'localhost',
  port: 3000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': formData.length,
  },
};

const signUpOrIn = (credentials, path) =>
  new Promise((resolve, reject) => {
    const options = Object.assign({ path }, baseOptions);
    const request = http.request(options, (response) => {
      let data = '';
      response.setEncoding('utf8');
      response.on('error', reject);
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        if (response.statusCode >= 200 &&
            response.statusCode < 300) {
          resolve(data);
        } else {
          reject({ response, data });
        }
      });
    });
    request.on('error', reject);
    request.write(credentials);
    request.end();
  });

const signUp = (credentials) => signUpOrIn(credentials, '/sign-up');
const signIn = (credentials) => signUpOrIn(credentials, '/sign-in');

signUp(formData)
.then(onSignUp)
.then(() => signIn(formData))
.then(onSignIn)
.catch(onError);
