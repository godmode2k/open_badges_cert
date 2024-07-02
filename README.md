# Open Badges Certification


Summary
-------------
> Open Badges Certification test </br>
> </br>
> WORK IN-PROGRESS


Environment
-------------
> build all and tested on GNU/Linux

    GNU/Linux: Ubuntu 20.04_x64 LTS
    Docker, Docker-Compose


Details
-------------
```sh
$ git clone https://github.com/godmode2k/open_badges_cert.git
$ cd open_badges_cert



---------------------------------------------
Dockerfile for Open Badges Test

SEE: <Dockerfile_open_badges_test> file
---------------------------------------------
$ cd open_badges_cert/open_badges_dockerfile/

$ sudo docker build -f Dockerfile_open_badges_test -t open_badges_test:1.0 . && sudo docker image prune && sudo docker builder prune
// 8080:80: http (default: apache2)
// 8081:443: https (default: apache2)
// 8082:81: tmp
$ sudo docker run --rm -it -p 8080:80 -p 8081:443 -p 8082:81 --name test_open_badges open_badges_test:1.0

# copy *.pem files and localhost SSL(TLS)
$ sudo docker cp (container-id-open_badges_test):/root/example.com+4.pem /etc/ssl/
$ sudo docker cp (container-id-open_badges_test):/root/example.com+4-key.pem /etc/ssl/
$ sudo cp /etc/ssl/example.com+4.pem /usr/local/share/ca-certificates/example.com+4.crt
$ sudo update-ca-certificates

$ sudo echo '10.0.2.15   example.com' >> /etc/hosts
$ sudo echo '10.0.2.15   www.example.com' >> /etc/hosts



---------------------------------------------
Resolve
https://github.com/decentralized-identity/universal-resolver

SEE: <docker-compose.yml.lite> file
 - port, service, cert for Node.js
---------------------------------------------
$ cd open_badges_cert/open_badges_dockerfile/libs/universal-resolver
$ git clone https://github.com/decentralized-identity/universal-resolver.git
$ cd universal-resolver/


// All
//$ sudo docker-compose -f docker-compose.yml pull
//$ sudo docker-compose -f docker-compose.yml up


// (USE THIS)
// Lite: port(7980)
$ cp ../docker-compose.yml.lite .
$ sudo docker-compose -f docker-compose.yml.lite up -d



$ sudo docker ps -a
SEE: (container-id) uport/uni-resolver-driver-did-uport:5.0.0

// hosts (Localhost)
$ sudo docker exec -it (container-id-resolver) sh -c "echo 'x.x.x.x    example.com' >> /etc/hosts"
$ sudo docker exec -it (container-id-resolver) sh -c "echo 'x.x.x.x    www.example.com' >> /etc/hosts"

// Localhost SSL(TLS)
// checks *.pem filename
$ sudo docker cp /usr/local/share/ca-certificates/example.com+4.crt (container-id-resolver):/usr/local/share/ca-certificates/
(container-id-resolver)# update-ca-certificates

//! DO NOT USE <docker-compose -f ... up> here.
$ sudo docker stop (container-id-resolver)
$ sudo docker start (container-id-resolver)



$ cd open_badges_cert/test/
$ node test_did_web_json.js
// did.json, did.keys
$ sudo docker cp did.json (container-id-open_badges_test):/var/www/html/.well-known/


// resolve: https://www.example.com
$ curl -X GET http://localhost:7980/1.0/identifiers/did:web:www.example.com
{"@context":"https://w3id.org/did-resolution/v1","didDocument":{"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/jws-2020/v1"],"id":"did:web:www.example.com","verificationMethod":[{"id":"did:web:www.example.com#owner","type":"JsonWebKey2020","controller":"did:web:www.example.com","publicKeyJwk":{"kty":"EC","crv":"secp256k1","x":"7gy2E1shf/a/YioZpGxwoz2OcAvWwSyHE0RRGA4Evpw=","y":"Mnqe6RCNm7JOhipCFiqvrZy8STL/mmix2uRYNAu8m1w="}}],"authentication":["did:web:www.example.com#owner"],"assertionMethod":["did:web:www.example.com#owner"]},"didResolutionMetadata":{"contentType":"application/did+ld+json","pattern":"^(did:web:.+)$","driverUrl":"http://uni-resolver-driver-did-uport:8081/1.0/identifiers/","duration":1100,"did":{"didString":"did:web:www.example.com","methodSpecificId":"www.example.com","method":"web"}},"didDocumentMetadata":{}}



---------------------------------------------
Validator (2.x, 3.x)
https://github.com/1EdTech/digital-credentials-public-validator

SEE: <Dockerfile_open_badges_validator> file

recommend using Open Badges Validator Core
(https://github.com/1EdTech/openbadges-validator-core)
if you plan to validate Open Badges 2.0 and lower.
---------------------------------------------
$ cd open_badges_cert/open_badges_dockerfile/libs/validators
$ Dockerfile_open_badges_validator

$ sudo docker build -f Dockerfile_open_badges_validator -t open_badges_validator:3.0 . && sudo docker image prune && sudo docker builder prune
// 8085:8080: http
// 8086:8081: tmp
$ sudo docker run --rm -it -p 8085:8080 -p 8086:8081 --name test_open_badges_validator open_badges_validator:3.0


// hosts (Localhost)
$ sudo docker exec -it (container-id-validator) sh -c "echo 'x.x.x.x    example.com' >> /etc/hosts"
$ sudo docker exec -it (container-id-validator) sh -c "echo 'x.x.x.x    www.example.com' >> /etc/hosts"

// Localhost SSL(TLS)
// checks *.pem filename
$ sudo docker cp /usr/local/share/ca-certificates/example.com+4.crt (container-id-validator):/usr/local/share/ca-certificates/
(container-id-validator)# update-ca-certificates

//! restart container doesn't required

(web-browser):
 - http://localhost:8085
 - http://localhost:8085/swagger-ui.html



---------------------------------------------
TEST
---------------------------------------------
$ cd open_badges_cert/test/

// did.json, did.keys
$ node test_did_web_json.js

// ed25519
$ cd test_ed25519/
$ npm install # or SEE: test_ed25519.js
$ node test_ed25519.js

-----

// ed25519: didkit
$ python3 test_did.py

// ed25519
$ node test_Ed25519.js



---------------------------------------------
TODO:
---------------------------------------------
// Open Badges Specification
// Final Release Spec Version 3.0
https://www.imsglobal.org/spec/ob/v3p0

// Open Badges Implementation Guide
// Candidate Final Public Spec Version 3.0
https://www.imsglobal.org/spec/ob/v3p0/impl/

```


