#!/bin/bash
echo "(1/8) Installing Node..."
sudo apt-get install nodejs
echo "(2/8) Installing NPM..."
sudo apt-get install npm
echo "(3/8) Installing backend packages..."
cd backend
npm
echo "(4/8) Downloading MongoDB..."
curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.0.15.tgz
echo "(5/8) Unzipping MongoDB..."
tar -zxvf mongodb-osx-x86_64-3.0.15.tgz
echo "(6/8) Installing MongoDB..."
mkdir -p mongodb
cp -R -n mongodb-osx-x86_64-3.0.15/ mongodb
export PATH=$(pwd)/mongodb/bin:$PATH
echo "(7/8) Init DB..."
mkdir -p db
echo "(8/8) Installing forever..."
npm i -g forever
echo "-----\n\nSetup Complete! Running Server!\n\n-----"