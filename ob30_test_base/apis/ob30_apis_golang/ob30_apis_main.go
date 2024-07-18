/* --------------------------------------------------------------
Project:    Open Badges APIs Server
Purpose:
Author:     Ho-Jung Kim (godmode2k@hotmail.com)
Date:       Since July 9, 2024
Filename:   ob30_apis_main.go

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
Reference:
 - https://github.com/labstack/echo
 - https://echo.labstack.com/docs
 - https://github.com/mattn/go-sqlite3/blob/master/_example/simple/simple.go
 - https://github.com/mattn/go-sqlite3/issues/204
 - https://pkg.go.dev/database/sql
 - https://pkg.go.dev/github.com/mattn/go-sqlite3

Dependencies:
// go get github.com/labstack/echo/{version}
$ go get github.com/labstack/echo/v4
$ go get github.com/labstack/echo/v4/middleware
$ go get github.com/mattn/go-sqlite3


Run:
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
-------------------------------------------------------------- */
package main



//! Header
// ---------------------------------------------------------------

import (
    "fmt"

    //"log"
    //"database/sql"

    //_ "github.com/mattn/go-sqlite3"

    //"net"
    "net/http"
    //"net/rpc"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"

    "ob30_apis/include"
)



//! Definition
// --------------------------------------------------------------------
var CERT = "/etc/ssl/example.com+4.pem"
var CERT_KEY = "/etc/ssl/example.com+4-key.pem"
var HOST = ":443"
//var HOST = ":8888"



//! Implementation
// --------------------------------------------------------------------

func main() {
    e := echo.New()

    e.Use(middleware.Logger())
    //e.Use(middleware.Recover())

    e.GET("/request", func(c echo.Context) error {
        req := c.Request()
        format := `
            <code>
            Protocol: %s<br>
            Host: %s<br>
            Remote Address: %s<br>
            Method: %s<br>
            Path: %s<br>
            </code>
        `
        return c.HTML(http.StatusOK, fmt.Sprintf(format, req.Proto, req.Host, req.RemoteAddr, req.Method, req.URL.Path))
    })

    // /.well-known/did.json
    e.GET( "/.well-known/:id", ob_route.Endpoint__well_known )

    // /v1/apis/

    // /v1/apis/issuers
    e.GET( "/apis/issuers/:id", ob_route.Endpoint__issuers )
    // /v1/apis/refresh
    e.GET( "/refresh/:id", ob_route.Endpoint__refresh )
    // /v1/apis/credentials
    e.GET( "/credentials/:id", ob_route.Endpoint__credentials )
    e.POST( "/credentials/:id", ob_route.Endpoint__credentials )
    // /v1/apis/create_issuer
    e.POST( "/create_issuer", ob_route.Endpoint__create_issuer )
    // /v1/apis/create_credentials_issuance
    e.POST( "/create_credentials_issuance", ob_route.Endpoint__create_credentials_issuance )
    // /v1/apis/update_credentials_issuance
    //e.POST( "/update_credentials_issuance", ob_route.Endpoint__update_credentials_issuance )
    // /v1/apis/delete_credentials_issuance
    //e.POST( "/delete_credentials_issuance", ob_route.Endpoint__delete_credentials_issuance )
    // /v1/apis/revocate_credentials_issuance
    //e.POST( "/revocate_credentials_issuance", ob_route.Endpoint__revocate_credentials_issuance )


    // http
    //e.Logger.Fatal( e.Start(HOST) )

    // https: SSL/TLS
    e.Logger.Fatal( e.StartTLS(HOST, CERT, CERT_KEY) )
}



