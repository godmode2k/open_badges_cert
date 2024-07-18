

Universal Resolver implementation and drivers.

https://github.com/decentralized-identity/universal-resolver



$ git clone https://github.com/decentralized-identity/universal-resolver
$ cd universal-resolver/


// All
$ sudo docker-compose -f docker-compose.yml pull
$ sudo docker-compose -f docker-compose.yml up


// Lite: port(7980)
$ sudo docker-compose -f docker-compose.yml.lite up -d



$ sudo docker ps -a
SEE: (container-id) uport/uni-resolver-driver-did-uport:5.0.0

// hosts (Localhost)
$ sudo docker exec -it (container-id) sh -c "echo 'x.x.x.x    example.com' >> /etc/hosts"
$ sudo docker exec -it (container-id) sh -c "echo 'x.x.x.x    www.example.com' >> /etc/hosts"

// Localhost SSL(TLS)
// checks *.pem filename
$ sudo docker cp /usr/local/share/ca-certificates/example.com+4.crt (container-id):/usr/local/share/ca-certificates/
(container)# update-ca-certificates
$ sudo docker stop (container-id: uport/uni-resolver-driver-did-uport:5.0.0)
$ sudo docker start (container-id: uport/uni-resolver-driver-did-uport:5.0.0)


// resolve: https://www.example.com
$ curl -X GET http://localhost:7980/1.0/identifiers/did:web:www.example.com
{"@context":"https://w3id.org/did-resolution/v1","didDocument":{"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/jws-2020/v1"],"id":"did:web:www.example.com","verificationMethod":[{"id":"did:web:www.example.com#owner","type":"JsonWebKey2020","controller":"did:web:www.example.com","publicKeyJwk":{"kty":"EC","crv":"secp256k1","x":"7gy2E1shf/a/YioZpGxwoz2OcAvWwSyHE0RRGA4Evpw=","y":"Mnqe6RCNm7JOhipCFiqvrZy8STL/mmix2uRYNAu8m1w="}}],"authentication":["did:web:www.example.com#owner"],"assertionMethod":["did:web:www.example.com#owner"]},"didResolutionMetadata":{"contentType":"application/did+ld+json","pattern":"^(did:web:.+)$","driverUrl":"http://uni-resolver-driver-did-uport:8081/1.0/identifiers/","duration":1100,"did":{"didString":"did:web:www.example.com","methodSpecificId":"www.example.com","method":"web"}},"didDocumentMetadata":{}}




