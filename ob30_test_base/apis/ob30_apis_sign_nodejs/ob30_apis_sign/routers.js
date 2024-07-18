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

$ npm install
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


import { COB30_libs } from './ob30_COB30_libs.js';



export { CRouters };

class CRouters {
    constructor() { }

    init_routes(app) {
        // NOTE: req data {
        //
        // requests:
        //  - https://localhost/test_api/100/aaa
        //  - https://localhost/test_api/100/aaa?title=bbb
        //  - https://localhost/test_api/100/aaa { with POST data: { a1: "100", b1: "200", c1: "300" }
        //
        // app.get( "/test_api/:id/:name", (req, res, next) => { ... } );
        //
        // req.params: { id: "100", name: "aaa" }
        // req.query: { title: "bbb" }
        // req.body: { a1: "100", b1: "200", c1: "300" }
        //
        // NOTE: req data }

        //app.get('/sign', function(req, res, next) {
        //    console.log( "GET" );
        //    console.log( req.params );
        //
        //
        //    res.send('GET: respond with a resource');
        //});

        app.post('/sign', async function(req, res, next) {
            console.log( "POST" );
            console.log( req.body );

            const result = await CRouters.sign( req );
            console.log( "=== result ===" );
            console.log( result );


            //res.send( 'POST: respond with a resource' + JSON.stringify(result) );
            res.send( JSON.stringify(result) );
        });
    }

    // ----------------------------------------------------
    // sign
    // ----------------------------------------------------
    static async sign(req) {
        if ( !req ) {
            throw new Error( 'JSON data == NULL' );
            return {}
        }

        const ob30libs = new COB30_libs();

        // test
        //ob30libs.test();


        const _json_data = req.body;
        let _keyPair = null;
        let result = null;

        // with create new keyPair
        result = await ob30libs.sign( _json_data, _keyPair );

        // reuse keyPair
        //_keyPair = result.keyPair;
        //result = await ob30libs.sign( _json_data, _keyPair );

        return result;
    }
}


