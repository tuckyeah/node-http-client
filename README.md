[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Node HTTP Module: Client

Node has a built-in HTTP module for making and responding to requests. In this
training, we'll use the HTTP module to issue requests to a server.

## Prerequisites

-   [ga-wdi-boston/node-api-promises](https://github.com/ga-wdi-boston/node-api-promises)

## Objectives

By the end of this, developers should be able to:

-   Make request from a Node client, similar to `curl`.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Install dependencies with `npm install`.

## Lab: Read Node Client Documentation

Read the following documentation from the Node HTTP module. While reading, take
note of any new concepts or vocabulary that is confusing. Pay attention to
function signatures. When you're finished taking notes, research one or two
points you'd like made clearer. We will discuss our findings.

-   [Class: `http.ClientRequest`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_clientrequest)
-   [`http.request(options[, callback])`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_http_request_options_callback)

## Demo: Make a Request

Start the echo server with `node lib/server.js`.

Make a reqeust by running `node lib/request.js`.

## Read-Along: A Simple request

Let's read the main part of the request script, the part that uses
`http.request`.

## Lab: Compare HTTP Client with `curl` and AJAX

Examine the code in [`lib/request.js`](lib/request.js). How is it similar to
`curl` and AJAX? How does it differ?

Annotate the code in [`lib/request-promises.js`](lib/request-promises.js).

## Additional Resources

-   [Basic HTTP Request with Node.js](https://davidwalsh.name/nodejs-http-request)
-   [Making HTTP Requests in Node.js](http://www.sitepoint.com/making-http-requests-in-node-js/)

## [License](LICENSE)

Source code distributed under the MIT license. Text and other assets copyright
General Assembly, Inc., all rights reserved.
