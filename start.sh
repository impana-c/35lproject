#!/bin/bash

# Installing dependencies for the client
cd App/client
npm install
npm i express cors mongoose dotenv nodemon concurrently 
npm install react-icons bootstrap axios react-router-dom 
npm install @react-google-maps/api

# Installing dependencies for the server
cd ../server
npm init -y
npm install express mongoose cors nodemon

# Installing UI dependencies
cd ../client
npm install @mui/icons-material f
cd ..
npm install @mui/material @mui/styled-engine-sc styled-components f

# Starting the app (after all installations)
cd App/client
npm run dev