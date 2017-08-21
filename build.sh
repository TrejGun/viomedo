#!/usr/bin/env bash

node_modules/.bin/rimraf ./build

node_modules/.bin/babel -d ./build/server ./server
node_modules/.bin/babel -d ./build/client ./client
node_modules/.bin/babel -d ./build/intl ./intl --copy-files
node_modules/.bin/babel -d ./build/static ./static --copy-files

NODE_ENV=${NODE_ENV:=production} node_modules/.bin/webpack --config server/configs/webpack.production.js
