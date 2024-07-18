/* --------------------------------------------------------------
Project:    Open Badges APIs Server
Purpose:
Author:     Ho-Jung Kim (godmode2k@hotmail.com)
Date:       Since July 9, 2024
Filename:   route.go

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
package ob_route



//! Header
// ---------------------------------------------------------------

import (
    "fmt"
    //"strings"
    //"strconv"
    "encoding/json"
    "log"
    "bytes"

    "net/http"
    "io/ioutil"
    "github.com/labstack/echo/v4"
    //"github.com/labstack/echo/v4/middleware"

    "ob30_apis/include/test"

    "reflect"
)



//! Definition
// --------------------------------------------------------------------



//! Implementation
// --------------------------------------------------------------------

/*
// .GET( "/users", sample )
// .POST( "/users/:id", sample )
// .PUT( "/users/:id", sample )
// .DELETE( "/users/:id", sample )
func Sample(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()

    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    // String
    var response string
    // JSON object
    var response map[string]interface{}

    // SEE: https://echo.labstack.com/docs/context
    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method

        go func() {
            // This function must not touch the Context.

            fmt.Printf("Method: %s\n", method)

            // Do some long running operations...


            // String
            ca <- "Hey!"

            // JSON object
            json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }


    // https://go.dev/src/net/http/status.go
	return c.JSON( http.StatusCreated, response )
    return c.JSON( http.StatusOK, response )
    return c.JSON( http.StatusInternalServerError, response )
    return c.NoContent( http.StatusNoContent )
}
*/


type Result_sign_block struct {
    Created string `json:"created"`
    KeyPair interface{} `json:"keyPair"`
    ProofValue interface{} `json:"proofValue"`
    ResultProof interface{} `json:"result_proof"`
}
type Result_sign_only_block struct {
    ResultProof interface{} `json:"result_proof"`
}


func request_sign_url(CONST_DATA_JSON string, method_post bool) Result_sign_block {
    // Sign Server
    API_SERVER := "https://127.0.0.1:8082"
    URL := API_SERVER + "/sign"


    var jsonObj interface{}
    json.Unmarshal( []byte(CONST_DATA_JSON), &jsonObj )
    REQ_DATA, _ := json.Marshal( jsonObj )

    var req *http.Request
    var response *http.Response
    var result Result_sign_block

    var err error
    req_method := ""
    if ( method_post == true ) {
        //response, err = http.Post( URL, HEADERS, bytes.NewBuffer(REQ_DATA) )
        req_method = "POST"
    } else {
        //response, err = http.Get( URL )
        req_method = "GET"
    }
    req, err = http.NewRequest( req_method, URL, bytes.NewBuffer(REQ_DATA) )
    if err != nil {
        log.Fatal( "http.NewRequest: ", err )
    }
    req.Header.Set( "Content-Type", "application/json" )

    client := &http.Client {}
    response, err = client.Do( req )
    if err != nil {
        log.Fatal( "http.Client: ", err )
    }

    defer response.Body.Close()
    if err != nil {
        log.Fatal( "response.Body: ", err )
    }

    //fmt.Println( "response: " )
    responseBody, err := ioutil.ReadAll( response.Body )
    if err != nil {
        log.Fatal( "ioutil.ReadAll: ", err )
    }

    fmt.Println( string(responseBody) )
    err = json.Unmarshal( responseBody, &result )
    if err != nil {
        log.Fatal( "json.Unmarshal: ", err )
    }


    return result
}

func sign(CONST_UNSIGNED_DOCUMENT string, return_all bool) interface{} {
    var result_all Result_sign_block
    var result_sign_only Result_sign_only_block
    var result interface{}

    // Sign
    result_all = request_sign_url( CONST_UNSIGNED_DOCUMENT, true )

    if ( return_all == true ) {
        result.(map[string]interface{})["result"] = result_all
    } else {
        //result_sign_only.(map[string]interface{})["result_proof"] = result_all.ResultProof.(map[string]interface{})["result_proof"]
        result_sign_only.ResultProof = result_all.ResultProof.(map[string]interface{})["result_proof"]
        result.(map[string]interface{})["result"] = result_sign_only
    }

    return result
}

// /.well-known/did.json
func Endpoint__well_known(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            json.Unmarshal( []byte(ob_test_sample_data.SAMPLE__json_did), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}

// /v1/apis/

// /v1/apis/issuers
func Endpoint__issuers(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}

// /v1/apis/refresh
func Endpoint__refresh(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}

// /v1/apis/credentials
func Endpoint__credentials(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            var sv Result_sign_block
            var jsonObj interface{}

            // test
            fmt.Println( reflect.TypeOf(ob_test_sample_data.SAMPLE__json_credentials_unsigned) )
            sv = request_sign_url( ob_test_sample_data.SAMPLE__json_credentials_unsigned, true )
            fmt.Println( "signed = ", sv )

            // signed document
            json.Unmarshal( []byte(ob_test_sample_data.SAMPLE__json_credentials_unsigned), &jsonObj )
            jsonObj.(map[string]interface{})["proof"] = sv.ResultProof.(map[string]interface{})["proof"]
            jsonObj_marshal, _ := json.Marshal( jsonObj )
            fmt.Println( string(jsonObj_marshal) )

            json.Unmarshal( jsonObj_marshal, &response )
            //json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}

// --------------------------------------------------------------------

// /v1/apis/create_issuer
func Endpoint__create_issuer(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}

// /v1/apis/create_credentials_issuance
func Endpoint__create_credentials_issuance(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}



// ---------------------------------------------------------------
/*
func Endpoint__xxx(c echo.Context) error {
    //id, _ := strconv.Atoi(c.Param("id"))
    //id, _ := c.Param("id")

    //var response string
    var response map[string]interface{}

    {
        // To prevent this channel from blocking, size is set to 1.
        ca := make(chan string, 1)

        r := c.Request()
        method := r.Method
        //fmt.Printf("Method: %s\n", method)

        if method == "GET" {
            // ...
        } else {
            // ...
        }

        go func() {
            // This function must not touch the Context.
            // Do some long running operations...

            json.Unmarshal( []byte(""), &response )
            ca <- ""
        }()

        select {
        case result := <-ca:
            //return c.String(http.StatusOK, "Result: "+result)
            //response = result
            if result != "" { return c.JSON( http.StatusInternalServerError, "" ) }
        case <-c.Request().Context().Done(): // Check context.
            // If it reaches here, this means that context was canceled (a timeout was reached, etc.).
            //return nil
            return c.JSON( http.StatusInternalServerError, "" )
        }
    }

    return c.JSON( http.StatusOK, response )
}
*/






