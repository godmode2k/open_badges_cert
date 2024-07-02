/* ---------------------------------------------------------
ed25519 test (ed25519-signature-2020)
 - hjkim, 2024.06.27


Source-based:
 - https://github.com/digitalbazaar/ed25519-signature-2020
 - https://github.com/digitalbazaar/ed25519-signature-2020/issues/22
 - https://github.com/digitalbazaar/vc
 -
 - https://github.com/digitalbazaar/ed25519-verification-key-2020


Dependencies:
$ npm install @digitalbazaar/ed25519-signature-2020
$ npm install @digitalbazaar/ed25519-verification-key-2020
$ npm install @digitalbazaar/ed25519-signature-2018
$ npm install @digitalbazaar/ed25519-verification-key-2018
$ npm install @digitalbazaar/security-document-loader
$ npm install @digitalbazaar/vc

// USE: from '@digitalbazaar/ed25519-signature-2020/test/{mock-data.js, documentLoader.js}'
$ cp node_modules/@digitalbazaar/ed25519-signature-2020/test/mock-data.js .
$ cp node_modules/@digitalbazaar/ed25519-signature-2020/test/documentLoader.js .

$ vim package.json
(ADD) type": "module"
{
    "...": { ... },
    type": "module"
}

---------------------------------------------------------


$ node test_ed25519.js
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "AlumniCredential": "https://schema.org#AlumniCredential",
      "alumniOf": "https://schema.org#alumniOf"
    },
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "http://example.edu/credentials/1872",
  "type": [
    "VerifiableCredential",
    "AlumniCredential"
  ],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "https://example.edu/students/alice",
    "alumniOf": "Example University"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2024-06-27T13:58:51Z",
    "verificationMethod": "https://example.edu/issuers/565049#z6MkkBgm7vEeFTPen6h6cxK27vm2K1ruiBjRPkVLT6XuMWfk",
    "proofPurpose": "assertionMethod",
    "proofValue": "z5TA24Wp4yPDT5WFUM3uKWRErHYn1H3LZV2NA28cyDXU4EnKHtwVrobwYEFH776en9UCyMULQ4u28b8fFirxLH3z4"
  }
}
--------------------------------------------------------- */


//import vc from '@digitalbazaar/vc';

// SEE: https://github.com/digitalbazaar/vc/issues/131
// There isn't a default export anymore. You can pull in everything with:
import * as vc from '@digitalbazaar/vc';


// Required to set up a suite instance with private key
import {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';
import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';
import {Ed25519VerificationKey2018} from '@digitalbazaar/ed25519-verification-key-2018';
//import {Ed25519Signature2018} from '@digitalbazaar/ed25519-signature-2018';


// USE: from '@digitalbazaar/ed25519-signature-2020/test/{mock-data.js, documentLoader.js}'
// example code: '@digitalbazaar/ed25519-signature-2020/test/Ed25519Signature2020.spec.js'
import {
  controllerDoc2018,
  credential,
  mockKeyPair2018,
  mockKeyPair2020,
  mockPublicKey2018
} from './mock-data.js';
import {loader} from './documentLoader.js';
const documentLoader = loader.build();


//const keyPair = await Ed25519VerificationKey2020.generate();
const keyPair = await Ed25519VerificationKey2018.generate({
    controller: 'https://example.edu/issuers/565049'
});

const suite = new Ed25519Signature2020({key: keyPair});


// USE: '@digitalbazaar/ed25519-signature-2020/test/mock-data.js'
/*
export const credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      AlumniCredential: 'https://schema.org#AlumniCredential',
      alumniOf: 'https://schema.org#alumniOf'
    },
    'https://w3id.org/security/suites/ed25519-2020/v1'
  ],
  id: 'http://example.edu/credentials/1872',
  type: ['VerifiableCredential', 'AlumniCredential'],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'https://example.edu/students/alice',
    alumniOf: 'Example University'
  }
};
*/
//
//
// Sample unsigned credential
/*
const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  }
};
*/


const signedVC = await vc.issue({credential, suite, documentLoader});
console.log(JSON.stringify(signedVC, null, 2));


// https://www.imsglobal.org/spec/ob/v3p0/impl#issuer-quickstart
// publicKeyMultibase: publicKeyBase58(key)

console.log( "suite =" )
console.log( suite )
console.log( "-----" )
console.log( "keyPair =" )
console.log( keyPair )
console.log( "-----" )
console.log( "keyPair export =" )
const keyPair_export = await keyPair.export({publicKey: true});
console.log( keyPair_export )
console.log( "-----" )
console.log( "keyPair fingerprint =" )
const keyPair_fingerprint = keyPair.fingerprint();
console.log( keyPair_fingerprint )







