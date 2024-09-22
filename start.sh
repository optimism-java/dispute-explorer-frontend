#!/bin/bash
# wait deps start
sleep 5

curl_response=$(curl -s -H "Authorization: Bearer $ADMIN_KEY" http://meiliSearch:7700/keys)
API_KEY=$(echo "$curl_response" | jq -r '.results[] | select(.actions[] | contains("*")) | .key')

echo "Successfully get the KEY $API_KEY."
NGINX_CONF="/etc/nginx/nginx.conf"

sed -i "s/TOKEN/$API_KEY/g" "$NGINX_CONF" || {
  echo "Warning: Failed to replace KEY in $NGINX_CONF. Continuing with the unmodified configuration."
}

nginx -t -c "$NGINX_CONF"
if [ $? -ne 0 ]; then
  echo "Error: NGINX configuration test failed. Please check the configuration."
  exit 1
fi

nginx -g 'daemon off;'