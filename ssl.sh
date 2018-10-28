#!/bin/bash
cd backend
openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key