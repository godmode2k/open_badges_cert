"""
# -----------------------------------------------------------------
Project:    Open Badges APIs Server
Purpose:
Author:     Ho-Jung Kim (godmode2k@hotmail.com)
Date:       Since July 9, 2024
Filename:   views.py

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
# -----------------------------------------------------------------
Note:
# -----------------------------------------------------------------
Reference:


Dependencies:
// APIs Server: DRF
$ pip3 install djangorestframework
$ pip3 install django-cors-headers
$ pip3 install requests

// https: SSL/TLS
$ pip3 install django-sslserver
$ pip3 install pip-system-certs

// SQLite
$ sudo apt-get install build-essential
$ sudo apt-get install python3-dev
$ sudo apt-get install libsqlite3-dev
$ pip3 install pysqlite3


SEE: settings.py


Run:
$ sh run_ob30_apis.sh
-or-
// http
$ python3 manage.py runserver 0.0.0.0:8888
-or-
// https: SSL/TLS
$ python3 manage.py runsslserver 0.0.0.0:443 --certificate <cert.pem or .crt> --key cert-key.pem
# -----------------------------------------------------------------
"""

from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.http import JsonResponse

# for index page (/)
from django.views.decorators.csrf import csrf_exempt

import traceback
import sys
import datetime
import time
import math
import os

import requests
import json

# file upload
from rest_framework.views import APIView
#from rest_framework.parsers import FileUploadParser
from rest_framework import parsers
# SEE: https://stackoverflow.com/questions/59484753/how-to-read-or-save-a-file-from-multivaluedict-in-django
#from django.core.files.storage import default_storage
#from django.core.files.base import ContentFile

import sqlite3


from ob30_apis.ob30_apis.test_sample_data import *



# ---------------------------------------------------
# Dependencies
#
# ---------------------------------------------------


# TODO:
# - log



#
# ---------------------------------------------------

def __GET_FUNC_NAME__(self = None):
    class_name = ""

    if self != None:
        # class name
        class_name = self.__class__.__name__

    # func name
    #print( "[" + class_name + "::" + sys._getframe().f_code.co_name +"()]" )

    # caller name
    print( "[" + class_name + "::" + sys._getframe(1).f_code.co_name +"()]" )

# ---------------------------------------------------

class CDB:
    #db_filename = None
    conn = None

    def __init__(self):
        __GET_FUNC_NAME__(self)

        #self.db_filename = "ob30_sqlite3.db"

        try:
            #self.conn = sqlite3.connect( db_filename )
            self.conn = sqlite3.connect( "file:?mode=memory&cache=shared" )
        except Exception as e:
            traceback.print_exc()

    def __del__(self):
        __GET_FUNC_NAME__(self)

        try:
            self.conn.close()
        except Exception as e:
            traceback.print_exc()

    def query(self, sql):
        __GET_FUNC_NAME__(self)

        try:
            cur = self.conn.cursor()
            cur.execute( sql )
            self.conn.commit()

            #self.conn.close()
        except Exception as e:
            traceback.print_exc()

    def query_select(self, sql):
        __GET_FUNC_NAME__(self)

        try:
            cur = self.conn.cursor()
            cur.execute( sql )
            rows = cur.fetchall()

            #for row in rows:
            #    print( row )

            #self.conn.close()

            return rows
        except Exception as e:
            traceback.print_exc()

    def _test(self, sql):
        __GET_FUNC_NAME__(self)

        try:
            cur = self.conn.cursor()
            sql = "CREATE TABLE testdb (id integer not null primary key, f1 text, f2 text);"
            cur.execute( sql )
            self.conn.commit()

            sql = "INSERT INTO testdb (f1, f2) VALUES (?, ?)"
            cur.execute( sql, ('test1', 'test2') )
            self.conn.commit()

            cur = conn.cursor()
            cur.execute( "SELECT * FROM testdb" )
            rows = cur.fetchall()
            for row in rows:
                print( row )

            #self.conn.close()
        except Exception as e:
            traceback.print_exc()

# ---------------------------------------------------

def request_sign_url(CONST_DATA_JSON, method_post):
    # Sign Server
    API_SERVER = "https://127.0.0.1:8082"
    URL = API_SERVER + "/sign"


    HEADERS = { 'Content-Type':'application/json; charset=utf-8' }
    REQ_DATA = json.dumps( CONST_DATA_JSON )

    if method_post == True:
        res = requests.post( URL, data = REQ_DATA, headers = HEADERS )
    else:
        res = requests.get( URL, headers = HEADERS )

    return res

def sign(CONST_UNSIGNED_DOCUMENT, return_all):
    result = None

    # Sign
    signed_val_raw = request_sign_url( CONST_UNSIGNED_DOCUMENT, True )

    #print( "signed = \n" + signed_val_raw.text )
    sv = signed_val_raw.text.replace( "\\n", "" ).replace( "\\", "" ).replace( " ", "" )
    sv = json.loads( sv )
    #print( "signed = ", json.dumps(sv, indent=4) )

    if return_all == True:
        result = unsigned_document
        result["proof"] = sv["result_proof"]["proof"]
    else:
        result = { "result_proof": sv["result_proof"] }

    return result

# ---------------------------------------------------

"""
class sample(APIView):
    #parser_classes = (parsers.FormParser, parsers.MultiPartParser)

    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request, _id )

    def post(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request, _id )

    def do_work(self, type_get, request, _id ):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            result = { "res": "true" }

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
"""



# Implementation
# ---------------------------------------------------



class endpoint__well_known(APIView):
    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request, _id )

    def post(self, request, _id ):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request, _id )

    def do_work(self, type_get, request, _id ):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                #result = { "res": "true" }
                pass
            else:
                #print( "POST: ", request.POST )
                #result = { "res": "true" }
                pass

            #print( "json path = ", json_path )

            result = SAMPLE__json_did

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)

class endpoint__issuers(APIView):
    # _id: UUID

    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request, _id )

    def post(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request, _id )

    def do_work(self, type_get, request, _id):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            result = { "res": "true" }

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)

class endpoint__refresh(APIView):
    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request, _id )

    def post(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request, _id )

    def do_work(self, type_get, request, _id):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            #result = { "res": "true" }
            result = SAMPLE__json_refresh_service()

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)

class endpoint__credentials(APIView):
    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request, _id )

    def post(self, request, _id):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request, _id )

    def do_work(self, type_get, request, _id):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            #result = { "res": "true" }
            #result = SAMPLE__json_credentials2
            result = {}


            # TEST: Sign
            sv = sign( SAMPLE__json_credentials_unsigned, False )
            print( "signed = ", json.dumps(sv, indent=4) )

            result = SAMPLE__json_credentials_unsigned
            result["proof"] = sv["result_proof"]["proof"]

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)

# ---------------------------------------------------

class endpoint__create_issuer(APIView):
    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request )

    def post(self, request):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request )

    def do_work(self, type_get, request):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            result = { "res": "true" }

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)

class endpoint__create_credentials_issuance(APIView):
    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request )

    def post(self, request):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request )

    def do_work(self, type_get, request):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            result = { "res": "true" }

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)



# ---------------------------------------------------
"""
class endpoint__xxx(APIView):
    def __init__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def __del__(self):
        #__GET_FUNC_NAME__(self)
        pass

    def get(self, request):
        __GET_FUNC_NAME__(self)
        return self.do_work( True, request )

    def post(self, request):
        __GET_FUNC_NAME__(self)
        return self.do_work( False, request )

    def do_work(self, type_get, request):
        __GET_FUNC_NAME__(self)

        try:
            if type_get == True:
                #print( "GET: ", request.GET )
                pass
            else:
                #print( "POST: ", request.POST )
                pass

            result = { "res": "true" }

            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
        except Exception as e:
            traceback.print_exc()
            result = { "res": "false" }
            #res = json.loads(str(result))
            res = json.loads(json.dumps(result).encode("utf8"))
            return JsonResponse(res)
"""




