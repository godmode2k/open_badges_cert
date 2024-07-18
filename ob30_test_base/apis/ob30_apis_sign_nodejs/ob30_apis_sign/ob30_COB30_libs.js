/* ---------------------------------------------------------
Project:    ed25519 test (ed25519-signature-2020)
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


// OB30 EDDSA-RDFC-2022 {
$ npm install @digitalbazaar/eddsa-rdfc-2022-cryptosuite
$ npm install @digitalbazaar/data-integrity
$ npm install @digitalbazaar/data-integrity-context
$ npm install @digitalbazaar/multikey-context
$ npm install @digitalbazaar/security-document-loader

// Context: credentials v2
$ npm install @digitalbazaar/credentials-v2-context
or
$ npm install https://github.com/digitalbazaar/credentials-v2-context.git
 
$ npm install @digitalcredentials/open-badges-context

//
// ADD:
// filename: node_modules/@digitalbazaar/security-document-loader/lib/security-loader.js
//
//! hjkim: Context {
// https://github.com/digitalbazaar/credentials-v2-context
// import * as cred2 from '@digitalbazaar/credentials-v2-context';
//
// https://github.com/digitalcredentials/open-badges-context
// import obCtx from '@digitalcredentials/open-badges-context';
//
//
// https://github.com/digitalbazaar/credentials-v2-context
// NOTE: CONTEXT_URL: https://www.w3.org/ns/credentials/v2
//  loader.addStatic(cred2.constants.CONTEXT_URL,
//    cred2.contexts.get(cred2.constants.CONTEXT_URL));
//
// https://github.com/digitalcredentials/open-badges-context
//  loader.addStatic(obCtx.CONTEXT_URL_V3,
//    obCtx.contexts.get(obCtx.CONTEXT_URL_V3));
//! hjkim: Context }
// OB30 EDDSA-RDFC-2022 }



$ vim package.json
(ADD) type": "module"
{
    "...": { ... },
    type": "module"
}
---------------------------------------------------------
USE

import { COB30_libs } from './ob30_COB30_libs.js';

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


/*
//import vc from '@digitalbazaar/vc';
//
// SEE: https://github.com/digitalbazaar/vc/issues/131
// There isn't a default export anymore. You can pull in everything with:
//import * as vc from '@digitalbazaar/vc';

// Required to set up a suite instance with private key
//import {Ed25519VerificationKey2018} from '@digitalbazaar/ed25519-verification-key-2018';
//import {Ed25519Signature2018} from '@digitalbazaar/ed25519-signature-2018';
import {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';
import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';


// './node_modules/@digitalbazaar/ed25519-verification-key-2020/lib/Ed25519VerificationKey2020.js' {
import * as base58btc from 'base58-universal';
// multibase base58-btc header
const MULTIBASE_BASE58BTC_HEADER = 'z';
// './node_modules/@digitalbazaar/ed25519-verification-key-2020/lib/Ed25519VerificationKey2020.js' }


// './node_modules/@digitalbazaar/ed25519-verification-key-2020/lib/ed25519.js' {
import {
  sign,
  verify,
  createHash,
  createPrivateKey,
  createPublicKey,
  randomBytes
} from 'node:crypto';
import {assertKeyBytes} from './node_modules/@digitalbazaar/ed25519-verification-key-2020/lib/validators.js';

// used to turn private key bytes into a buffer in DER format
const DER_PRIVATE_KEY_PREFIX = Buffer.from( '302e020100300506032b657004220420', 'hex');

function privateKeyDerEncode({privateKeyBytes, seedBytes}) {
  if(!(privateKeyBytes || seedBytes)) {
    throw new TypeError('`privateKeyBytes` or `seedBytes` is required.');
  }
  if(!privateKeyBytes) {
    assertKeyBytes({
      bytes: seedBytes,
      expectedLength: 32
    });
  }
  if(!seedBytes) {
    assertKeyBytes({
      bytes: privateKeyBytes,
      expectedLength: 64
    });
  }
  let p;
  if(seedBytes) {
    p = seedBytes;
  } else {
    // extract the first 32 bytes of the 64 byte private key representation
    p = privateKeyBytes.slice(0, 32);
  }
  return Buffer.concat([DER_PRIVATE_KEY_PREFIX, p]);
}
// ed25519: './node_modules/@digitalbazaar/ed25519-verification-key-2020/lib/ed25519.js' }
*/

import * as Ed25519Multikey from '@digitalbazaar/ed25519-multikey';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as eddsaRdfc2022CryptoSuite} from '@digitalbazaar/eddsa-rdfc-2022-cryptosuite';
import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;

import {loader} from './documentLoader_eddsa_rdfc_2022.js';
//const documentLoader = loader.build();




import fs from 'node:fs'



// --------------------------------------------------------



export { COB30_libs };

class COB30_libs {
    constructor() { }

    save_as_json(json_data, save_json_filename) {
        try {
            // utf-8 (with BOM)
            // $ file --mime-encoding did.json
            //fs.writeFileSync( save_json_filename, '\ufeff' + json_data, {encoding: 'utf8'} );
            //fs.writeFileSync( save_json_filename, json_data, {encoding: 'utf8'} );

            fs.writeFileSync( save_json_filename, json_data );
            console.log( `[+] created: ${save_json_filename}` );
        } catch (err) {
            console.error(err);
        }
    }

    async sign(_json_data, _keyPair) {
        let _id = null;
        let keyPair = _keyPair;

        let publicKey_str = null;
        let privateKey_str = null;
        let privateKeyBytes = null;
        let keyPair_fingerprint = null;

        let new_created_datetime = null;
        let proofValue = null;


        try {
            // "issuer": { "id": "https://www.example.com/issuers/111", ... }
            _id = _json_data.issuer.id;

            if ( !_json_data ) {
                throw new Error( 'JSON data == NULL' );
                return {};
            }

            if ( !_keyPair ) {
                /*
                keyPair = await Ed25519VerificationKey2020.generate({
                    type: 'Ed25519VerificationKey2020',
                    //controller: 'https://www.example.com/issuers/111'
                    controller: _id
                });
                */
                keyPair = await Ed25519Multikey.generate({
                    controller: _id
                });

                publicKey_str = keyPair.publicKeyMultibase;
                //privateKey_str = keyPair.privateKeyMultibase;
                privateKey_str = keyPair.secretKeyMultibase;
                //privateKeyBytes = keyPair._privateKeyBuffer;
                privateKeyBytes = Uint8Array.from( keyPair.secretKey );

                //keyPair_fingerprint = keyPair.fingerprint();

                keyPair.privateKeyBytes = privateKeyBytes;
                //keyPair.fingerprint = keyPair_fingerprint;
            }
            else {
                publicKey_str = keyPair.publicKeyMultibase;
                privateKey_str = keyPair.privateKeyMultibase;
                privateKeyBytes = keyPair.privateKeyBytes;

                //! FIXME: reuse keyPair from client
                keyPair = null; // NO return, new created only
            }

            //const privateKey = await createPrivateKey({
            //    key: privateKeyDerEncode({privateKeyBytes}),
            //    format: 'der',
            //    type: 'pkcs8'
            //});

            const publicKey = await keyPair.export({publicKey: true, includeContext: true});
            //console.log( "export publicKey = ", publicKey );
            keyPair["@context"] = publicKey["@context"];
            keyPair["type"] = publicKey.type;
            loader.addStatic( String(publicKey.id), publicKey );
            // create key's controller document
            const controllerDoc = {
              '@context': [
                'https://www.w3.org/ns/did/v1',
                'https://w3id.org/security/multikey/v1'
              ],
              id: _id,
              assertionMethod: [publicKey]
            };
            //addDocumentToLoader({url: controllerDoc.id, document: controllerDoc});
            loader.addStatic( String(controllerDoc.id), controllerDoc );

            // create suite
            const suite = new DataIntegrityProof({
              signer: keyPair.signer(), cryptosuite: eddsaRdfc2022CryptoSuite
            });

            const documentLoader = loader.build();
            console.log( documentLoader );


            // "proof": [{ "type": "DataIntegrityProof", "created": "2010-01-01T19:23:24Z", ... }]
            // proof[0].created: "2010-01-01T19:23:24Z"
            //new_created_datetime = new Date().toISOString().split('.')[0]+"Z";
            //credential3.proof[0].created = new_created_datetime;
            //credential3.proof[0].verificationMethod = credential3.proof[0].verificationMethod + publicKey_str;


            const signedCredential = await jsigs.sign(_json_data,
                { suite, purpose: new AssertionProofPurpose(), documentLoader });
            console.log( "signed credential = ", signedCredential );
            proofValue = signedCredential.proof;


        } catch ( error ) {
            throw new Error( '' + error );
            return {};
        }


        const result = {
            "created": new_created_datetime,
            "keyPair": keyPair,
            "proofValue": proofValue,
            "result_proof": {
                "proof":
                /*
                [{
                    "type": "DataIntegrityProof",
                    //"type": "Ed25519Signature2020",
                    "created": new_created_datetime,
                    "verificationMethod": _id + "#" + publicKey_str,
                    "cryptosuite": "eddsa-rdfc-2022",
                    "proofPurpose": "assertionMethod",
                    "proofValue": proofValue
                }]
                */
                Array.isArray(proofValue) ?
                        //! FIXME:
                        // - Python DRF version: works good (but, increase proof, previous result)
                        // - Golang ECHO version: works good (always one proof)

                        // use last one generated
                        // - proofValue[proofValue.length-1]: last generated
                        // - proofValue[(proofValue.length-2) .. 0]: previous generated
                        ((proofValue.length > 1)? [proofValue[proofValue.length-1]] : proofValue)
                        :
                        [proofValue]
            }
        };

        //console.log( "[+] result (signed) = " + result );
        return result;
    }

    async test() {
        const credential =
        {
          "@context": [
            "https://www.w3.org/ns/credentials/v2",
            "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
          ],
          "id": "http://www.example.com/credentials/1234",
          "type": [
            "VerifiableCredential",
            "OpenBadgeCredential"
          ],
          "issuer": {
            "id": "https://www.example.com/issuers/111",
            "type": [
              "Profile"
            ],
            "name": "Example Corp"
          },
          "validFrom": "2010-01-01T00:00:00Z",
          "name": "Teamwork Badge",
          "credentialSubject": {
            "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
            "type": [
              "AchievementSubject"
            ],
            "achievement": {
              "id": "https://www.example.com/achievements/21st-century-skills/teamwork",
              "type": [
                "Achievement"
              ],
              "criteria": {
                "narrative": "Team members are nominated for this badge by their peers and recognized upon review by Example Corp management."
              },
              "description": "This badge recognizes the development of the capacity to collaborate within a group environment.",
              "name": "Teamwork"
            }
          }
          /*
            ,
          "proof": [{
            "type": "DataIntegrityProof",
            //"type": "Ed25519Signature2020",
            "created": "2010-01-01T19:23:24Z",
            "verificationMethod": "https://www.example.com/issuers/111#z6MktUEDtbePoq8VhPsUGkqNmZkhpUWoST8eq57MiWwzxTdR",
            "cryptosuite": "eddsa-rdfc-2022",
            "proofPurpose": "assertionMethod",
            "proofValue": "z3AiANnE5XEDuvtmMYYTFtchZvcpJetbV7G1srbf7twzmDkSGKbxJro2yD4vDKvpKyoE2SJC3o7N6bNem7z8j5kr2"
          }]
          */
        };


        const _id = credential.issuer.id;
        const keyPair = await Ed25519Multikey.generate({
            controller: _id
        });



        //const xxx = Buffer.from("");
        //const xxx = new TextEncoder().encode("");

        const publicKey_str = keyPair.publicKeyMultibase;
        const privateKey_str = keyPair.privateKeyMultibase;
        //const privateKeyBytes = keyPair._privateKeyBuffer;
        const privateKeyBytes = Uint8Array.from( keyPair.secretKey );
        //const keyPair_fingerprint = keyPair.fingerprint();
        keyPair.privateKeyBytes = privateKeyBytes;


        const publicKey = await keyPair.export({publicKey: true, includeContext: true});
        //console.log( "export publicKey = ", publicKey );
        keyPair["@context"] = publicKey["@context"];
        keyPair["type"] = publicKey.type;
        loader.addStatic( String(publicKey.id), publicKey );
        // create key's controller document
        const controllerDoc = {
          '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://w3id.org/security/multikey/v1'
          ],
          id: _id,
          assertionMethod: [publicKey]
        };
        //addDocumentToLoader({url: controllerDoc.id, document: controllerDoc});
        loader.addStatic( String(controllerDoc.id), controllerDoc );

        // create suite
        const suite = new DataIntegrityProof({
          signer: keyPair.signer(), cryptosuite: eddsaRdfc2022CryptoSuite
        });

        const documentLoader = loader.build();
        console.log( documentLoader );



        // "proof": [{ "type": "DataIntegrityProof", "created": "2010-01-01T19:23:24Z", ... }]
        // proof[0].created: "2010-01-01T19:23:24Z"
        //const new_created_datetime = new Date().toISOString().split('.')[0]+"Z";
        //credential3.proof[0].created = new_created_datetime;
        //credential3.proof[0].verificationMethod = credential3.proof[0].verificationMethod + publicKey_str;


        let proofValue = null;
        const signedCredential = await jsigs.sign(credential,
            { suite, purpose: new AssertionProofPurpose(), documentLoader });
        console.log( "signed credential = ", signedCredential );
        proofValue = signedCredential.proof;


        console.log( "[+] credential = " );
        console.log( credential );
        console.log( "\n" );
        console.log( "[+] created: " + proofValue.create );
        console.log( "[+] public key (str) = " + publicKey_str );
        console.log( "[+] private key (str) = " + privateKey_str );
        console.log( "[+] private key (bytes) = " + privateKeyBytes + ", len = " + privateKeyBytes.length );
        //console.log( "[+] keyPair_fingerprint = " + keyPair_fingerprint );
        console.log( "[+] keyPair = " );
        console.log( keyPair );
        console.log( "[+] result (proofValue: signed) = " + JSON.stringify(proofValue, null, 2) );

        const result_proof = {
            "proof": proofValue
        };
        console.log( "[+] result (proof: signed) = " + JSON.stringify(result_proof, null, 2) );
    }
} // class COB30_libs {}


