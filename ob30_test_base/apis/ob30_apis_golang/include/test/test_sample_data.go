/* --------------------------------------------------------------
Project:    Open Badges APIs Server
Purpose:
Author:     Ho-Jung Kim (godmode2k@hotmail.com)
Date:       Since July 9, 2024
Filename:   test_sample_data.go

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
-----------------------------------------------------------------
Note:
-----------------------------------------------------------------
-------------------------------------------------------------- */
package ob_test_sample_data



//! Header
// ---------------------------------------------------------------

import (
    "fmt"
    //"strings"
    //"strconv"
)


//r := strings.NewReplacer("\n", "", "\r", "", "\t", "", "\\", "", "\"", "")
//str := r.Replace( "string..." )



//! Definition
// --------------------------------------------------------------------

// ---------------------------------------------------
// /.well-known/did.json
// ---------------------------------------------------
var SAMPLE__json_did =
`
{ 
  "@context": [ 
    "https://www.w3.org/ns/did/v1", 
    "https://w3id.org/security/suites/jws-2020/v1" 
  ], 
  "id": "did:web:www.example.com", 
  "verificationMethod": [ 
    { 
      "id": "did:web:www.example.com#owner", 
      "type": "JsonWebKey2020", 
      "controller": "did:web:www.example.com", 
      "publicKeyJwk": { 
        "kty": "EC", 
        "crv": "secp256k1", 
        "x": "7gy2E1shf/a/YioZpGxwoz2OcAvWwSyHE0RRGA4Evpw=", 
        "y": "Mnqe6RCNm7JOhipCFiqvrZy8STL/mmix2uRYNAu8m1w=" 
      } 
    } 
  ], 
  "authentication": [ 
    "did:web:www.example.com#owner" 
  ], 
  "assertionMethod": [ 
    "did:web:www.example.com#owner" 
  ] 
}
`



// ---------------------------------------------------
// credentials
// ---------------------------------------------------
var SAMPLE__json_credentials = fmt.Sprintf( "%s%s%s",
`
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
  ],
  "id": "https://www.example.com/issuers/111",
  "type": [
    "VerifiableCredential",
    "AchievementCredential"
  ],
  "issuer": {
    "id": "did:web:www.example.com:issuers:111",
    "type": [
      "Profile"
    ],
    "address": {
      "type": [
        "Address"
      ],
      "addressCountry": "Japan"
    },
    "name": "1EdTech Testing"
  },
  "awardedDate": "2023-05-22T14:09:00Z",
  "validFrom": "2024-07-08T06:11:18Z",
  "name": "ob3-simple-did-web-method_new_achievement.json",
  "credentialSubject": {
    "id": "did:web:www.example.com:issuers:111",
    "type": [
      "AchievementSubject"
    ],
    "achievement": {
      "id": "https://www.example.com/issuers/111",
      "type": [
        "Achievement"
      ],
      "achievementType": "Achievement",
      "criteria": {
        "narrative": "Passes tests"
      },
      "description": "A second testing achievement",
      "name": "Achievement 2"
    },
    "source": {
      "id": "did:web:www.example.com:issuers:111",
      "type": [
        "Profile"
      ],
      "address": {
        "type": [
          "Address"
        ],
        "addressCountry": "Japan"
      },
      "name": "1EdTech Testing"
    }
  },
`,


//! TODO
// refreshService
// https://www.imsglobal.org/spec/vccr/v1p0/#example-sample-response-with-extended-expiration-date
// expirationDate (DateTimeZ): A DateTime with the trailing timezone specifier included, e.g. 2021-09-07T02:09:59+02:00
// Note: /refresh/{UUID}
//
//"expirationDate": "2024-07-12T06:11:18Z",
`
  "refreshService": {
    "id": "https://www.example.com/refresh/1234",
    "type": "1EdTechCredentialRefresh"
  },
`,

/*
`
  "refreshService": {
    "id": "https://dc.1edtech.org/wellspring2022/wellspring-portal/api/refresh/d002b4e9-6fd9-4af0-b1f7-faa9237b46ca",
    "type": "1EdTechCredentialRefresh"
  },
`,
*/


`
  "proof": [{
    "type": "DataIntegrityProof",
    "created": "2024-07-08T06:11:18Z",
    "verificationMethod": "did:web:www.example.com:issuers:111#z6Mkj66qp9AbrcLqgVPSWKvWrvDgu6mHHoxGANABpkdSYfC8",
    "cryptosuite": "eddsa-rdfc-2022",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3gJWH3DqNHhPqfFxKmpBW9wh6fMHNdVZAbYh6hSwoFo5WaXgY9pGVusaMa9XSLya7z7TK81XHj6EYFqMgf1Czx48"
  }]
}
`)



var SAMPLE__json_credentials_unsigned =
`
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
}
`





