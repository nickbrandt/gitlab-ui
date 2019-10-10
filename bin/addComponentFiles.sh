#!/bin/bash

# Prompt user for component name
echo 'what is the name of your new component?';
echo 'please type this in snake case, e.g. "progress_bar"';
read COMPONENT_NAME;

# Ask use which directory they want to put the component in
printf "Which folder best categorizes your component?:\n"
cd "components"
select d in */; do test -n "$d" && break; echo ">>> Invalid Selection"; done
cd $d

# Add the new files
mkdir -p $COMPONENT_NAME/examples
cd $COMPONENT_NAME
touch $COMPONENT_NAME.{documentation.js,stories.js,vue}
touch examples/{index,$COMPONENT_NAME.basic.example}.js

# Inform the user
echo "Success! Your starter files for $COMPONENT_NAME.vue were successfully created"
echo "They're totally empty though, you've still got work to do."