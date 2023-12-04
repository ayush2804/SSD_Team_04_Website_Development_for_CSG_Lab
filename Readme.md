# MERN App Deployment Guide 

## Prerequisites
Before deploying the MERN (MongoDB, Express.js, React, Node.js) app, make sure to follow these steps:

### open terminal ``` Ctrl+Alt+T```

1. **Install MongoDB Compass:**
   - MongoDB Compass is a graphical user interface for MongoDB that allows you to interact with your database visually.
   - Download and install MongoDB Compass from [MongoDB official website](https://www.mongodb.com/try/download/compass).
   - Run below script to download MongoDB
   ```
        #!/bin/bash

        # Function to check if MongoDB Compass is already installed
        check_mongo_compass_installed() {
        if [ -x "$(command -v mongod)" ]; then
            echo "MongoDB Compass is already installed. Exiting."
            exit 0
        fi
        }

        # Function to install MongoDB Compass
        install_mongo_compass() {
        echo "Downloading MongoDB Compass..."
        wget https://downloads.mongodb.com/compass/mongodb-compass-community_latest_amd64.deb

        echo "Installing MongoDB Compass..."
        sudo dpkg -i mongodb-compass-community_latest_amd64.deb

        # Install dependencies (if any)
        sudo apt-get -f install

        # Cleanup downloaded installer
        rm mongodb-compass-community_latest_amd64.deb

        echo "MongoDB Compass installed successfully."
        }

        # Main script execution
        check_mongo_compass_installed
        install_mongo_compass
    
    ```
    ### give execute permission to script
    ```
        chmod +x install_mongo_compass.sh
    ```

    ### run script
    ```
        ./install_mongo_compass.sh
    ```

2. **Create a new MongoDB Database:**
   - Open MongoDB Compass and create a new database named `ssd_proj`.

## Deployment Steps

### Step 1: Run Deployment Script
Execute the following steps to deploy the MERN app:

1. install Apache to deploy the MERN app
    ```
        #!/bin/bash

        # Function to check if Apache2 is already installed
        check_apache_installed() {
        if [ -x "$(command -v apache2)" ]; then
            echo "Apache2 is already installed. Exiting."
            exit 0
        fi
        }

        # Function to install Apache2
        install_apache() {
        echo "Updating package lists..."
        sudo apt update

        echo "Installing Apache2..."
        sudo apt install -y apache2

        echo "Enabling Apache2 service..."
        sudo systemctl enable apache2

        echo "Starting Apache2 service..."
        sudo systemctl start apache2

        echo "Apache2 installed and running successfully."
        }

        # Main script execution
        check_apache_installed
        install_apache

    ```

    ### give execute permission to script
    ```
        chmod +x install_apache.sh
    ```

    ### run script
    ```
        ./install_apache.sh
    ```

2. Create deploy.sh
    ```
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


    ```

### Clone the repository
git clone https://github.com/your-username/your-mern-app.git

### Navigate to the project directory
cd your-mern-app

### Give execute permission to deploy.sh
chmod +x deploy.sh

### Run the deployment script
./deploy.sh

## Open the project
-  Once the deployment script has run successfully, open your browser and navigate to the deployed domain to access the MERN app.
```
    http://localhost:5173/
```
## Step 3: Connect to MongoDB Database
- Open MongoDB Compass and connect to the ssd_proj database. Ensure that you have the necessary permissions to access the database.

## Step 4: Add Faculty Data
- Navigate to the MERN app and append /faculty to the URL. Add new faculty information and view the current data.
```
    API endpoint: http://localhost:5173/faculty
```

## Step 5: Submit Data
- After adding faculty data, click on the submit button. Check MongoDB Compass to verify that the data has been updated at the backend.

## Step 6: Verify in MERN App
- Refresh the MERN app page, and check the table view for the new entry at the end on the same page.

## Step 7: Repeat Steps 4-6
- Repeat the above steps (4-6) for each of the following endpoints:
```
    API endpoint: http://localhost:5173/students
    API endpoint: http://localhost:5173/papers
    API endpoint: http://localhost:5173/events
    API endpoint: http://localhost:5173/projects
```
## Close the deployment
```
    pm2 stop all
```
## Exit from API server
```
    Ctrl+Z 
```
### disclaimer
- all commands are for Ubuntu 22.04.