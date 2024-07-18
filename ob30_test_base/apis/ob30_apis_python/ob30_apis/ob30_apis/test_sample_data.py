# Test Sample JSON Data

from datetime import datetime



# ---------------------------------------------------
# /.well-known/did.json
# ---------------------------------------------------
SAMPLE__json_did = \
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

# ---------------------------------------------------
# credentials
# ---------------------------------------------------
SAMPLE__json_credentials = \
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
  ],
  #"id": "https://www.example.com/credentials/111",
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

#  "refreshService": {
#    # Note: /refresh/{UUID}
#    "id": "https://www.example.com/refresh/1234",
#    #"id": "https://www.example.com/refresh/d002b4e9-6fd9-4af0-b1f7-faa9237b46ca",
#    "type": "1EdTechCredentialRefresh"
#  },

#  "refreshService": {
#    "id": "https://dc.1edtech.org/wellspring2022/wellspring-portal/api/refresh/d002b4e9-6fd9-4af0-b1f7-faa9237b46ca",
#    "type": "1EdTechCredentialRefresh"
#  },

  "proof": [{
    "type": "DataIntegrityProof",
    "created": "2024-07-08T06:11:18Z",
    #"verificationMethod": "did:web:www.example.com:issuers:111#z6Mkj66qp9AbrcLqgVPSWKvWrvDgu6mHHoxGANABpkdSYfC8",
    "verificationMethod": "did:web:www.example.com:issuers:111#z6Mko1AYttoUwo4fBxacNQroADFs2BQGUuMcusajyRvzZu8A",
    "cryptosuite": "eddsa-rdfc-2022",
    "proofPurpose": "assertionMethod",
    #"proofValue": "z3gJWH3DqNHhPqfFxKmpBW9wh6fMHNdVZAbYh6hSwoFo5WaXgY9pGVusaMa9XSLya7z7TK81XHj6EYFqMgf1Czx48"
    "proofValue": "z4EPbNGxdn4zkhbN6TuSqqLMRMKRsaXfNwsCVardzaqgN7Ejq6hVNgkxBHDm5rvmBJasTEj6ibcZvxgnGrgFxS6TU"
  }]
}

# ---------------------------------------------------
# refresh (refresh_service)
# ---------------------------------------------------
def SAMPLE__json_refresh_service():
    SAMPLE__json_refresh_service = \
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
  ],
  #"id": "https://www.example.com/credentials/111",
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

  # refreshService
  # https://www.imsglobal.org/spec/vccr/v1p0/#example-sample-response-with-extended-expiration-date
  # expirationDate (DateTimeZ): A DateTime with the trailing timezone specifier included, e.g. 2021-09-07T02:09:59+02:00
  #"expirationDate": "2024-07-12T06:11:18Z",
#  "expirationDate": datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
#  "refreshService": {
#    # Note: /refresh/{UUID}
#    "id": "https://www.example.com/refresh/1234",
#    #"id": "https://www.example.com/refresh/d002b4e9-6fd9-4af0-b1f7-faa9237b46ca",
#    "type": "1EdTechCredentialRefresh"
#  },

#  "refreshService": {
#    "id": "https://dc.1edtech.org/wellspring2022/wellspring-portal/api/refresh/d002b4e9-6fd9-4af0-b1f7-faa9237b46ca",
#    "type": "1EdTechCredentialRefresh"
#  },

  "proof": [{
    "type": "DataIntegrityProof",
    "created": "2024-07-08T06:11:18Z",
    #"verificationMethod": "did:web:www.example.com:issuers:111#z6Mkj66qp9AbrcLqgVPSWKvWrvDgu6mHHoxGANABpkdSYfC8",
    "verificationMethod": "did:web:www.example.com:issuers:111#z6Mko1AYttoUwo4fBxacNQroADFs2BQGUuMcusajyRvzZu8A",
    "cryptosuite": "eddsa-rdfc-2022",
    "proofPurpose": "assertionMethod",
    #"proofValue": "z3gJWH3DqNHhPqfFxKmpBW9wh6fMHNdVZAbYh6hSwoFo5WaXgY9pGVusaMa9XSLya7z7TK81XHj6EYFqMgf1Czx48"
    "proofValue": "z4EPbNGxdn4zkhbN6TuSqqLMRMKRsaXfNwsCVardzaqgN7Ejq6hVNgkxBHDm5rvmBJasTEj6ibcZvxgnGrgFxS6TU"
  }]
}
    return SAMPLE__json_refresh_service



SAMPLE__json_credentials_unsigned = \
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
#  ,
#  "proof": [{
#    "type": "DataIntegrityProof",
#    "created": "2024-07-11T13:55:20Z",
#    "verificationMethod": "https://www.example.com/issuers/111#z6MknAjetE6tP2TbsaB5cNmooSgYFNcxP5iP1PNZPrvMLt8q",
#    "cryptosuite": "eddsa-rdfc-2022",
#    "proofPurpose": "assertionMethod",
#    "proofValue": "zWtAazSji7idsrJKtPgxAxzamMQWFAZqkL7TWp3bvBEpfRawZaLv7j7FdTvuERhNYMLzLinMeATDtEM6xi2KThbb"
#  }]
}


SAMPLE__json_credentials2 = \
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
  },
  "proof": [{
    "type": "DataIntegrityProof",
    "created": "2024-07-11T13:55:20Z",
    "verificationMethod": "https://www.example.com/issuers/111#z6MknAjetE6tP2TbsaB5cNmooSgYFNcxP5iP1PNZPrvMLt8q",
    "cryptosuite": "eddsa-rdfc-2022",
    "proofPurpose": "assertionMethod",
    "proofValue": "zWtAazSji7idsrJKtPgxAxzamMQWFAZqkL7TWp3bvBEpfRawZaLv7j7FdTvuERhNYMLzLinMeATDtEM6xi2KThbb"
  }]
}






