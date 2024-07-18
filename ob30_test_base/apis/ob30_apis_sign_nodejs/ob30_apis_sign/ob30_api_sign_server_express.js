/* ---------------------------------------------------------
Project:    ed25519 (ed25519-signature-2020) Sign Server (Express.js)
Purpose:
Author:     Ho-Jung Kim (godmode2k@hotmail.com)
Date:       Since June 27, 2024

License:

*
* Copyright (C) 2024 Ho-Jung Kim (godmode2k@hotmail.com)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
---------------------------------------------------------
Source-based:
 - https://github.com/digitalbazaar/ed25519-signature-2020
 - https://github.com/digitalbazaar/ed25519-signature-2020/issues/22
 - https://github.com/digitalbazaar/ed25519-verification-key-2020
// - https://github.com/digitalbazaar/vc


Dependencies:
$ npm install @digitalbazaar/ed25519-signature-2020
$ npm install @digitalbazaar/ed25519-verification-key-2020
//$ npm install @digitalbazaar/ed25519-signature-2018
//$ npm install @digitalbazaar/ed25519-verification-key-2018
//$ npm install @digitalbazaar/security-document-loader
//$ npm install @digitalbazaar/vc

// USE: from '@digitalbazaar/ed25519-signature-2020/test/{mock-data.js, documentLoader.js}'
//$ cp node_modules/@digitalbazaar/ed25519-signature-2020/test/mock-data.js .
//$ cp node_modules/@digitalbazaar/ed25519-signature-2020/test/documentLoader.js .


$ vim package.json
(ADD) type": "module"
{
    "...": { ... },
    type": "module"
}
---------------------------------------------------------
USE

import { COB30_libs } from './COB30_libs.js';

const ob30libs = new COB30_libs();

// test
ob30libs.test();


let result = null;
const _json_data = credential2;
let _keyPair = null;

// with create new keyPair
result = await ob30libs.sign( _json_data, _keyPair );

// reuse keyPair
_keyPair = result.keyPair;
result = await ob30libs.sign( _json_data, _keyPair );
--------------------------------------------------------- */


import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import Debug from 'debug';
const debug = Debug('ob30-apis-sign:server');

import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs'



// Init Express.js
// --------------------------------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));



// Routers
// --------------------------------------------
//app.use('/', indexRouter);
//app.get( "/", (req, res) => { res.send( "hello!" ); });

import { CRouters } from './routers.js';
const routers = new CRouters();
routers.init_routes( app );



// Server
// --------------------------------------------

//const port = 443;
const port = 8082;
app.set('port', port);

//var server = http.createServer(app);
//var server = https.createServer(app);

// https
const options = {
    cert: fs.readFileSync('/etc/ssl/example.com+4.pem'),
    key: fs.readFileSync('/etc/ssl/example.com+4-key.pem')
};
var server = https.createServer(options, app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log( "Starting server at https://0.0.0.0:" + port + "\n" );


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}





