// Source-based: https://github.com/skounis/vc-hello-didweb


import crypto from 'crypto';
import elliptic from 'elliptic';

// Request a 32 byte key
const size = parseInt(process.argv.slice(2)[0]) || 32;
const randomString = crypto.randomBytes(size).toString("hex");
const key = randomString;

console.log(`Key (hex): ${key}`)  // ee48d32e6c724c4d

// Calculate the `secp256k1` curve and build the public key
const ec = new elliptic.ec('secp256k1');
const prv = ec.keyFromPrivate(key, 'hex');
const pub = prv.getPublic();
console.log(`Public (hex): ${prv.getPublic('hex')}`)
console.log(`x (hex): ${pub.x.toBuffer().toString('hex')}`)
console.log(`y (hex): ${pub.y.toBuffer().toString('hex')}`)
console.log(`x (base64): ${pub.x.toBuffer().toString('base64')}`)
console.log(`y (base64): ${pub.y.toBuffer().toString('base64')}`)
console.log(`-- kty: EC, crv: secp256k1`)



// ----------------------------------------------



const public_key_hex = prv.getPublic('hex');
const x_hex = pub.x.toBuffer().toString('hex');
const y_hex = pub.y.toBuffer().toString('hex');
const x_base64 = pub.x.toBuffer().toString('base64');
const y_base64 = pub.y.toBuffer().toString('base64');
const new_domain = 'www.example.com';

import fs from 'node:fs'
const did_json_filename = 'did.json';
const did_json = `\
{ \n\
  "@context": [ \n\
    "https://www.w3.org/ns/did/v1", \n\
    "https://w3id.org/security/suites/jws-2020/v1" \n\
  ], \n\
  "id": "did:web:${new_domain}", \n\
  "verificationMethod": [ \n\
    { \n\
      "id": "did:web:${new_domain}#owner", \n\
      "type": "JsonWebKey2020", \n\
      "controller": "did:web:${new_domain}", \n\
      "publicKeyJwk": { \n\
        "kty": "EC", \n\
        "crv": "secp256k1", \n\
        "x": "${x_base64}", \n\
        "y": "${y_base64}" \n\
      } \n\
    } \n\
  ], \n\
  "authentication": [ \n\
    "did:web:${new_domain}#owner" \n\
  ], \n\
  "assertionMethod": [ \n\
    "did:web:${new_domain}#owner" \n\
  ] \n\
} \n\
`;

const did_keys_filename = 'did.keys';
const did_keys = `\
Public (hex): ${prv.getPublic('hex')} \n\
x (hex): ${pub.x.toBuffer().toString('hex')} \n\
y (hex): ${pub.y.toBuffer().toString('hex')} \n\
x (base64): ${pub.x.toBuffer().toString('base64')} \n\
y (base64): ${pub.y.toBuffer().toString('base64')} \n\
-- kty: EC, crv: secp256k1 \n\
`;



try {
    // utf-8 (with BOM)
    // $ file --mime-encoding did.json
    //fs.writeFileSync( did_json_filename, '\ufeff' + did_json, {encoding: 'utf8'} );
    //fs.writeFileSync( did_json_filename, did_json, {encoding: 'utf8'} );

    fs.writeFileSync( did_json_filename, did_json ); // use this
    console.log( `[+] created: ${did_json_filename}` );

    fs.writeFileSync( did_keys_filename, did_keys );
    console.log( `[+] created: ${did_keys_filename}` );
} catch (err) {
    console.error(err);
}






