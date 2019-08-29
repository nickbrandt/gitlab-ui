#!/bin/bash

DIRECTORY=$(dirname "$0")
FILE_NAME=scss_variables
FILE_PATH=${DIRECTORY}/${FILE_NAME}
SCSS_FILE=${FILE_PATH}.scss
JSON_FILE=${FILE_PATH}.json
JS_FILE=${FILE_PATH}.js

yarn sass-export ./scss/variables.scss -o $JSON_FILE
node ${DIRECTORY}/export_scss.js
