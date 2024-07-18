


Open Badges APIs Server (Golang version)
 - hjkim (godmode2k@hotmail.com), 2024.07.09



--------------------------------------
Dependencies
--------------------------------------
// Golang
$ wget https://go.dev/dl/go1.22.5.linux-amd64.tar.gz
$ sudo tar xzvf go1.22.5.linux-amd64.tar.gz -C /usr/local/
$ echo "export PATH=$PATH:/usr/local/go/bin" >> $HOME/.profile


$ mkdir ob30_apis_golang
$ cd ob30_apis_golang
$ go mod init ob30_apis


// APIs Server: echo
// https: SSL/TLS
// go get github.com/labstack/echo/{version}
$ go get github.com/labstack/echo/v4
$ go get github.com/labstack/echo/v4/middleware


// SQLite
$ go get github.com/mattn/go-sqlite3

// dependency management (add, remove automatically)
$ go mod tidy -e



--------------------------------------
Run
--------------------------------------
// http
$ go run ob30_apis_main.go
// https: SSL/TLS
$ sudo go run ob30_apis_main.go

// Set HTTP, HTTPS
ob30_apis_main.go: main() {
    var CERT = "cert.pem"
    var CERT_KEY = "cert-key.pem"
    //var HOST = ":443"
    var HOST = ":8888"

    // http
    e.Logger.Fatal( e.Start(HOST) )

    // https: SSL/TLS
    e.Logger.Fatal( e.StartTLS(HOST, CERT, CERT_KEY) )
}




