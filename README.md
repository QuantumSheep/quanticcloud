# Quantic Cloud

Quantic cloud is a "flat file" based cloud. Which means that all the files are stored staticaly in a directory.

## How it works
Quantic Cloud need 3 NodeJS (minimum v9.18.0) processes to run, one for serving the client's files, one for retriving informations from your database (API) and another one used as a proxy server.

- The client's part use Angular 5 to provide a powerful end-user interface.
- The server retrieve data like the files list and send it as JSON format.
- Finally, the proxy is used to sync the client's and API's servers and prevent to [Cross-origin resource sharing (CORS)](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) limitations.

## Installation
First you will need `nodejs`, `npm` and `git` (optional)

Then:
- Clone this repo (`git clone https://github.com/QuantumSheep/quanticcloud.git`)
- Install the dependencies (`npm install`)
- Install the Angular Command-Line Interface (`npm install @angular/cli -g`)
- Build the sources (`npm build`);
- Start the servers (`npm start`)

This will use PM2 as a monitoring tool.
