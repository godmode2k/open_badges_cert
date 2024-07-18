#!/bin/sh


#python3 manage.py runserver 0.0.0.0:8888


# SSL/TLS
#python3 manage.py runsslserver 0.0.0.0:8888 --certificate /etc/ssl/example.com+4.pem --key /etc/ssl/example.com+4-key.pem
python3 manage.py runsslserver 0.0.0.0:443 --certificate /etc/ssl/example.com+4.pem --key /etc/ssl/example.com+4-key.pem


