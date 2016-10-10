'use strict';

const http = require('http');

// this is going to be a command line script, because of that process.argv
const method = (process.argv[2] || 'get').toUpperCase();

const data = JSON.stringify({
  key: 'value',
});

const headers = {
  'Content-Type': 'application/json',
  'Content-Length': data.length,
};

// some() is a predicate method that takes a callback... if the callback
// returns true for _any_ value, the method will return true.
// so this is a quick way of doing 'if method === post || method === Patch'
// to check to see if the HTTP is a 'post' or a 'patch'
const sendData = ['POST', 'PATCH'].some(e => e === method);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/upload',
  method,
};

// so if it's send data, we're setting headers
if (sendData) {
  options.headers = headers;
}

// so create a request by calling http.request, passing the options
// we set above on line 23, and a callback
// this just defines and stores the function - it does NOT run it!
// the callback is invoked later, when we get the response
const request = http.request(options, (response) => {
  // now we're inside a callback that listens for the response event
  let data = '';
  response.setEncoding('utf8'); // this is our http response!
  response.on('error', console.error);
  // triggered by the response body coming back... it's just a listener.
  response.on('data', (chunk) => { // 'data' is the reponse body coming back
    data += chunk;
  });

  // when the response is done, we have a response for that too!
  response.on('end', () => {
    console.log(data);
  });
});

// we're just logging it here, but in real life, we'd be more serious about this
request.on('error', console.error);

// so then again, if we're sending data, we're going to write the data to the request
if (sendData) {
  request.write(data);
}

// once we call request.end(), we know that the request is complete and this is how
// we tell the API we're done so we can continue with everything else in the queue.
request.end();
