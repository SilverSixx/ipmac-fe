#!/bin/sh

# Generate the runtime config file with environment variables
cat > /usr/share/nginx/html/config.js << EOF
window.RUNTIME_CONFIG = {
  KEYCLOAK_URL: '${VITE_KEYCLOAK_URL}',
  KEYCLOAK_REALM: '${VITE_KEYCLOAK_REALM}',
  KEYCLOAK_CLIENT_ID: '${VITE_KEYCLOAK_CLIENT_ID}',
  API_URL: '${VITE_API_URL}'
};
EOF

# Start nginx
nginx -g 'daemon off;'