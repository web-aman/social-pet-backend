#!/bin/bash

# Define the path to the Docker config.json file
CONFIG_PATH="$HOME/.docker/config.json"

# Create the .docker directory if it doesn't exist
mkdir -p "$(dirname "$CONFIG_PATH")"

# Define the configuration content
CONFIG_CONTENT='{
  "auths": {
    "https://index.docker.io/v1/": {
      "auth": "'"$(echo -n 'amanneema1311:AmanN@1198#' | base64)"'"
    }
  },
  "credsStore": "desktop" // Optional: if using Docker Desktop
}'

# Write the Docker config.json file
echo "$CONFIG_CONTENT" > "$CONFIG_PATH"

# Execute any other commands or start your application
exec "$@"
