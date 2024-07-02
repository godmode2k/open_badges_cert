

Create/Add a ca-certificates and updates
 - hjkim, 2024.06.19



------------------------------------------
MKCERT
https://github.com/FiloSottile/mkcert
------------------------------------------
// download mkcert
// https://github.com/FiloSottile/mkcert/releases

$ cd $HOME
$ wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
$ chmod 755 mkcert-v1.4.4-linux-amd64
$ ln -s mkcert-v1.4.4-linux-amd64 mkcert

// creates: rootCA.pem, rootCA-key.pem
$ ./mkcert -install

// prints pem path
// default: $HOME/.local/share/mkcert
$ ./mkcert -CAROOT

// sign
// output:
// example.com+4.pem
// example.com+4-key.pem
// +4: example.com + 4("*.example.com" localhost 127.0.0.1 ::1)
$ sudo ./mkcert example.com "*.example.com" localhost 127.0.0.1 ::1

// copy *.pem to ...
$ sudo cp ./*.pem /etc/ssl/

// copy example.com+4.pem to example.com+4.crt
$ sudo cp $(ls *.pem | grep -v "key") $(echo $(ls *.pem | grep -v "key") | sed 's/.pem/.crt/')

// copy *.crt to /usr/local/share/ca-certificates/
$ sudo cp *.crt /usr/local/share/ca-certificates/

// updates
$ sudo update-ca-certificates



------------------------------------------
without run </usr/sbin/update-ca-certificates>
add a ca-certificates
------------------------------------------
$ sudo cp example.com+4.pem /usr/local/share/ca-certificates/example.com+4.crt

$ sudo cd /etc/ssl/
$ sudo ln -s /usr/local/share/ca-certificates/example.com+4.crt example.com+4.pem
$ sudo openssl x509 -in example.com+4.pem -noout -hash
4cc32ba4
$ sudo ln -s example.com+4.pem 4cc32ba4.0
$ sudo cp /etc/ssl/ca-certificates.crt /etc/ssl/ca-certificates.crt.old
$ sudo cat example.com+4.pem >> /etc/ssl/ca-certificates.crt



------------------------------------------
Node.JS
------------------------------------------
// SEE: https://github.com/FiloSottile/mkcert

$ sudo export NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem"
$ sudo node <app.js>


// for docker-compose (for node.js, did:web here...)
// https://github.com/decentralized-identity/universal-resolver/blob/main/docker-compose.yml
docker-compose.yml {
version: "3.6"

networks:
  default:
    name: universal-resolver

services:
  ...
  uni-resolver-driver-did-uport:
    image: uport/uni-resolver-driver-did-uport:5.0.0
    ports:
      - "8083:8081"
    environment:
      NODE_EXTRA_CA_CERTS: /root/rootCA.pem
...
}
$ sudo docker-compose -f docker-compose.yml up -d
$ sudo docker cp $(mkcert -CAROOT)/rootCA.pem (container_id: uport/uni-resolver-driver-did-uport:5.0.0):/root
$ sudo docker stop (container_id: uport/uni-resolver-driver-did-uport:5.0.0)
$ sudo docker start (container_id: uport/uni-resolver-driver-did-uport:5.0.0)




