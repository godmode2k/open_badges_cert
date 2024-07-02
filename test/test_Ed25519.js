// Source-based: https://stackoverflow.com/questions/66802775/generate-eddsa-25519-key-pair-for-jose-nodejs

import crypto from 'crypto';


const keypair = crypto.generateKeyPairSync(
  'ed25519', 
  {
    privateKeyEncoding: { format: 'pem', type: 'pkcs8' }, 
    publicKeyEncoding: { format: 'pem', type: 'spki' }
  }
)

console.log(keypair.privateKey)
console.log(keypair.publicKey)



// Source-based: https://github.com/nodejs/help/issues/3000
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
const _der = privateKey.export({ format: 'der', type: 'pkcs8' }).toString();
const der = privateKey.export({ format: 'der', type: 'pkcs8' }).toString('hex');
const rawHex = der.substring(32); // can serialize this / use it with libsodium etc...
console.log( publicKey )
console.log( privateKey )
console.log( _der )
console.log( der )
console.log( rawHex )



