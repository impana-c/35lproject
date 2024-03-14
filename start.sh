#!/bin/bash

# Putting data into mongoDB. Please make sure you have mongoDB set up and python3 installed and in your $PATH.
python3 insert.py

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
cd client
npm run dev