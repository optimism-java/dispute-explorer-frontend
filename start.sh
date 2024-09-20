#!/bin/bash


curl_response=$(curl -s -H "Authorization: Bearer $ADMIN_KEY" http://meiliSearch:7700/keys)
API_KEY=$(echo "$curl_response" | jq -r '.results[] | select(.actions[] | contains("*")) | .key')
NGINX_CONF="/etc/nginx/nginx.conf"

sed -i "s/KEY/$API_KEY/g" $NGINX_CONF

nginx