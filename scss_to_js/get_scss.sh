#!/bin/bash

DIRECTORY=$(dirname "$0")
FILE_NAME=scss_variables
FILE_PATH=${DIRECTORY}/${FILE_NAME}
SCSS_FILE=${FILE_PATH}.scss
JSON_FILE=${FILE_PATH}.json
JS_FILE=${FILE_PATH}.js

if [ "$RELOAD_SCSS_VARIABLES" = "true" ] || [ ! -f "$JS_FILE" ]; then
  curl https://gitlab.com/gitlab-org/gitlab-ce/raw/master/app/assets/stylesheets/framework/variables.scss -o $SCSS_FILE
  yarn sass-export $SCSS_FILE -o $JSON_FILE
  node ${DIRECTORY}/export_scss.js
fi
