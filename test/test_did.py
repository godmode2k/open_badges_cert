#
# Source: https://www.spruceid.dev/didkit/didkit-packages/python
#
#
# Note:
# $ sudo apt-get install python3 python3-pip vim jq
# $ pip install -U didkit
# $ pip install asyncio PyLD
#
# $ pip install ecdsa
# $ pip install ecdsa[gmpy2] // higher speed
# //$ pip install ecdsa[gmpy] // slower, for legacy option
#
#
# $ python3 test_did.py
#jwk =  {"kty":"OKP","crv":"Ed25519","x":"605oX84JkOIfa_gZHwLHMVt5LMRLHzYlHeOPukIqVDA","d":"lYC916yh1SmnLcPHc6A3WYv_2pZGe9TIMyIZVQwTf5w"}
#did =  did:key:z6MkvHoCUSzZGtat3sLGMHCMBWfnFuzgpwJrY4LaHuadCtVM
#----------
#{'@context': 'https://www.w3.org/2018/credentials/v1',
# 'credentialSubject': {'id': 'did:key:example:d23dd687a7dc6787646f2eb98d0'},
# 'id': 'http://example.org/credentials/3731',
# 'issuanceDate': '2020-08-19T21:41:50Z',
# 'issuer': 'did:key:z6MkvHoCUSzZGtat3sLGMHCMBWfnFuzgpwJrY4LaHuadCtVM',
# 'proof': {'created': '2024-06-27T08:41:20.464Z',
#           'jws': 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..r1IPPNS1M2yMWjANdZ0m1XReMHCHAKXDz_JPaZRZAbcg4ivo9pzX0NH-knT13Ihoo5BD96SFPflssteyXH-6Ag',
#           'proofPurpose': 'assertionMethod',
#           'type': 'Ed25519Signature2018',
#           'verificationMethod': 'did:key:z6MkvHoCUSzZGtat3sLGMHCMBWfnFuzgpwJrY4LaHuadCtVM#z6MkvHoCUSzZGtat3sLGMHCMBWfnFuzgpwJrY4LaHuadCtVM'},
# 'type': ['VerifiableCredential']}
#



import asyncio
import didkit
import json

import pprint

jwk = didkit.generate_ed25519_key()
did = didkit.key_to_did("key", jwk)

credential = {
    "@context": "https://www.w3.org/2018/credentials/v1",
    "id": "http://example.org/credentials/3731",
    "type": ["VerifiableCredential"],
    "issuer": did,
    "issuanceDate": "2020-08-19T21:41:50Z",
    "credentialSubject": {
        "id": "did:key:example:d23dd687a7dc6787646f2eb98d0",
    },
}

async def main():
    signed_credential = await didkit.issue_credential(
        json.dumps(credential),
        json.dumps({}),
        jwk)
    #print(json.loads(signed_credential))

    print( "jwk = ", jwk )
    print( "did = ", did )
    print( "----------" )
    pprint.pprint(json.loads(signed_credential))

asyncio.run(main())
