'use strict';

const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
  let start = process.hrtime();
  new Promise((resolve, reject) => {
    let body = '';
    request.on('error', (error) => {
      reject(error);
    });
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      resolve(body);
    });
  }).then((data) => {
    let parsedUrl = url.parse(request.url, true);
    let keys = Object.keys(parsedUrl);
    keys.forEach((key) => {
      if (parsedUrl[key] === null) {
        delete parsedUrl[key];
      }
    });
    return {
      httpVersion: request.httpVersion,
      method: request.method,
      parsedUrl,
      headers: request.headers,
      data,
    };
  }).then(JSON.stringify).then((json) => {
    response.writeHead(200, 'OK', {
      'Content-Length': json.length,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ['OPTIONS', 'POST', 'GET', 'PATCH', 'DELETE'],
    });
    response.write(json);
    response.end();
  }).catch(console.error).then(() => {
    let elapsed = process.hrtime(start);
    console.log(`Request processed in ${elapsed[0] * 1e9 + elapsed[1]} nanoseconds`);
  });
});

server.on('listening', () => {
  console.log('echo server listening');
});

server.listen(3000);
