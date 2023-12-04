# SSD_Team_04_Website_Development_for_CSG_Lab
# contributor @soumitraghosh388
#Deployment for MERN

#!/bin/bash

# MERN Deployment Script with Apache

# Configuration
APP_NAME="csgt4"
APP_DIR="/home/ayan/ssd_project"
# REPO_URL="https://github.com/yourusername/your-app-repo.git"
MONGODB_URI="mongodb://localhost:27017/ssd_proj"
NODE_ENV="production"
# NODE_ENV="development"
# NODE_ENV="test"
DOMAIN="example.com"

# Update the system
# sudo apt-get update
# sudo apt-get upgrade -y

# Install Node.js and npm
# sudo apt-get install -y nodejs npm

# Clone the repository
# git clone $REPO_URL $APP_DIR
cd $APP_DIR

# Install server dependencies
cd server
npm install
npm start & # run in background
cd ..

# Install client dependencies and build React app
cd client
npm install
# npm run build
npm run dev
cd ..

# Set up environment variables
echo "MONGODB_URI=$MONGODB_URI" >> .env
echo "NODE_ENV=$NODE_ENV" >> .env

# Install and configure PM2 for process management
sudo npm install -g pm2
pm2 start server/index.js
pm2 save
pm2 startup

# Install and configure Apache
# sudo apt-get install -y apache2
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod ssl

# Set up Apache virtual host
sudo tee /etc/apache2/sites-available/$APP_NAME.conf > /dev/null <<EOL
<VirtualHost *:80>
    ServerName $DOMAIN
    Redirect permanent / https://$DOMAIN/
</VirtualHost>

<VirtualHost *:443>
    ServerName $DOMAIN

    DocumentRoot $APP_DIR/client/build

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$DOMAIN/privkey.pem

    <Directory $APP_DIR/client/build>
        Options -Indexes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>

    ProxyPass /api http://localhost:3000/api
    ProxyPassReverse /api http://localhost:3000/api

    ErrorLog \${APACHE_LOG_DIR}/$APP_NAME_error.log
    CustomLog \${APACHE_LOG_DIR}/$APP_NAME_access.log combined
</VirtualHost>
EOL

# Enable the virtual host
sudo a2ensite $APP_NAME.conf

# Reload Apache
# sudo systemctl reload apache2
sudo systemctl restart apache2

# Print completion message
echo "Deployment completed successfully!"

