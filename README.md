# 35lproject (REPLACE WITH NAME)

### Cloning
```
git clone https://github.com/impana-c/35lproject
cd 35lproject
```

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

### Installing UI dependencies
```
cd ../client
npm install @mui/icons-material f
cd ..
npm install @mui/material @mui/styled-engine-sc styled-components f
```

### Starting the app (after all installations)
(Make sure to run: 
    `sudo killall -9 node` on terminal 
if any node processes were previously running.)
(Assuming you are in the 35lproject repo folder)
```
cd App/client
npm run dev
```

### Changing API Keys
Replace "YOURAPIKEY" in the index.html and Template.jsx files with your Google Maps API Key
