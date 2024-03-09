# 35lproject (REPLACE WITH NAME)

### Installing dependencies for the client
```
cd App/client
npm install
npm i express cors mongoose dotenv nodemon concurrently 
npm install react-icons bootstrap axios react-router-dom 
npm install @react-google-maps/api
```

### Installing dependencies for the server
```
cd ../server
npm init -y
npm install express mongoose cors nodemon
```

### Starting the app
(make sure to run: 
    `sudo killall -9 node` on terminal 
if any node processes were previously running.)
```
cd App/client
npm run dev
```

### Changing API Keys
Replace "YOURAPIKEY" in the index.html and Template.jsx files with your Google Maps API Key
