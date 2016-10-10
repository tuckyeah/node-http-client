'use strict';

// gain access to node-provided http module
const http = require('http');

// take the command-lind argument for user email and password
// and nest them in a POJO, then convert that POJO to a JSON string
const formData = JSON.stringify({
  credentials: {
    email: process.argv[2],
    password: process.argv[3],
  },
});

// defining an error handler for the error listener
const onError = (error) => {
  // if the error has a response, then it did it hit the server, so we want
  // to check the status code and status message
  if (typeof error === 'object' &&
      error.response) {
    // log http response status and message
    console.error(error.response.statusCode, error.response.statusMessage);
    console.error(error.data);
  } else {
    console.error(error.stack);
  }
};

// defining a signIn handler that will show us that we signed in
// handle successful sign-in
const onSignIn = (response) => {
  console.log(response);
  console.log('Signed in');
};

// handle successful sign-up
const onSignUp = (response) => {
  console.log(response);
  console.log('Signed up');
};

// define basic 'options' to pass to the http request further down
// this is stuff that doesn't change for sign up or sign in
const baseOptions = {
  hostname: 'localhost',
  port: 3000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': formData.length,
  },
};

// Fat-arrow function that implicitly returns a new Promise
// create function to sign Up or In
const signUpOrIn = (credentials, path) =>

  // return Promise for sign up or in request
  new Promise((resolve, reject) => {
    // create request options using baseOptions as a starting point
    const options = Object.assign({ path }, baseOptions);

    // creating a new http request
    const request = http.request(options, (response) => {
      // handle response
      let data = '';
      response.setEncoding('utf8');

      // on error, reject promise with response error
      //  note that the coallback 'reject' gets passed the error
      // if something happens here, it's probably a network error
      response.on('error', reject);

      // handle the response data
      response.on('data', (chunk) => {
        data += chunk;
      });

      // resolve on completed response
      response.on('end', () => {
        // if the status code is in this range, resolve the promise
        if (response.statusCode >= 200 &&
            response.statusCode < 300) {
          resolve(data);
        } else {
          // but if it's outside of that range, we reject down here
          // this will reject the promise and pass response & data to the 'reject' callback
          // reject if non successful status code on response
          reject({ response, data });
        }
      });
    });
    request.on('error', reject);
    request.write(credentials);
    // indicates that we are done adding stuff to the request
    // and the request can actually be initiated - ie 'start the async process'
    request.end();
  });

const signUp = (credentials) => signUpOrIn(credentials, '/sign-up');
const signIn = (credentials) => signUpOrIn(credentials, '/sign-in');

signUp(formData)
.then(onSignUp)
.then(() => signIn(formData))
.then(onSignIn)
.catch(onError);
