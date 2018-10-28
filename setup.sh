#!/bin/bash
echo "(1/8) Installing Node..."
sudo apt-get install nodejs
echo "(2/8) Installing NPM..."
sudo apt-get install npm
echo "(3/8) Installing backend packages..."
cd backend
npm
echo "(4/8) Downloading MongoDB..."
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.0.3.tgz
echo "(5/8) Unzipping MongoDB..."
tar -zxvf mongodb-linux-x86_64-ubuntu1804-4.0.3.tgz
echo "(6/8) Installing MongoDB..."
mkdir -p mongodb
cp -R -n -a mongodb-linux-x86_64-ubuntu1804-4.0.3/. mongodb/
export PATH=/app/backend/mongodb/bin:$PATH
echo "(7/8) Init DB..."
mkdir -p db
echo "(8/8) Starting DB..."
pwd
./mongodb/bin/mongod --dbpath db &
jobs
echo "-----Setup Complete! Running Server!-----"