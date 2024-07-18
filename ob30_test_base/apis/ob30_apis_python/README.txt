


Open Badges APIs Server (Python version)
 - hjkim (godmode2k@hotmail.com), 2024.07.09



--------------------------------------
Dependencies
--------------------------------------
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



//--------------------------------------
//Creates project
//--------------------------------------
//$ mkdir ob30_apis
//$ cd ob30_apis
//$ django-admin startproject ob30_apis .
//$ cd ob30_apis
//$ django-admin startapp ob30_apis
//$ cd ..
//$ python3 manage.py migrate



--------------------------------------
settings.py
--------------------------------------
...

#ALLOWED_HOSTS = []

# ADD
ALLOWED_HOSTS = ["*"] # allow clients, "*" or "x.x.x.x", ...
#CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8888",
    "http://127.0.0.1:8888",

    "https://localhost",
    "https://127.0.0.1",
    "https://www.example.com",

    # Browser (127.0.0.1:9010) <-> Request 127.0.0.1:8888 (VirtualBox Network Port Forward) <-> 10.244.0.4:8888
    #"http://127.0.0.1:9010",
]

INSTALLED_APPS = [
    ...

    # ADD
    # CORS
    'corsheaders',
    'rest_framework',
    # SSL/TLS
    'sslserver',
]

# ADD
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        # No Web UI, JSON only
        'rest_framework.renderers.JSONRenderer',
    )
}

MIDDLEWARE = [
    # ADD
    'corsheaders.middleware.CorsMiddleware',

    ...
]



--------------------------------------
Run
--------------------------------------
// http
$ python3 manage.py runserver 0.0.0.0:8888

// https: SSL/TLS
$ sudo python3 manage.py runsslserver 0.0.0.0:443 --certificate <cert.pem or .crt> --key <cert-key.pem>



