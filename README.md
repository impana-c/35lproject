# cafFIEND
#### fueling your coffee craze.

Inspired by [Yelp](https://www.yelp.com/), cafFIEND is a minimalistic website about all things coffee-shop related. cafFIEND is dedicated to coffee enthusiasts, providing a platform to discover and review coffee shops nearby. Users can explore a curated selection of coffee establishments, read and write reviews, and learn info about crucial features for each cafe. The website aims to create a community of coffee lovers sharing their experiences and recommendations to help others find the perfect coffee spot wherever they go.

cafFIEND is implemented as a MERN stack, using [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [React.js](https://react.dev/), and [Node.js](https://nodejs.org/en).

# Installation and Setup

### MongoDB Setup
Please follow the instructions in the link [HERE](https://www.mongodb.com/docs/manual/administration/install-community/) to install MongoDB. Also, please follow the instructions to start the server as well.
Make sure you are using the correct instructions for your specific Operating System.

### Cloning the project
```
git clone https://github.com/impana-c/cafFIEND.git
cd cafFIEND
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

### Putting in Google Maps API Key
1. Go to Google’s credential page: [Credentials Page](https://console.cloud.google.com/projectselector2/google/maps-apis/credentials?utm_source=Docs_CreateAPIKey&utm_content=Docs_maps-backend&_gl=1*hokhuc*_ga*MTgxNTM2NjM0MS4xNzEwMTg2MzMy*_ga_NRWSTWS78N*MTcxMDI5MDA2MC4xLjEuMTcxMDI5MDIwMS4wLjAuMA)
2. Create a project and setup account.
3. Select the project you want for this app.
4. Fill out the dialog boxes and an API key should show up.
5. Copy the API key.
6. Replace "YOUR_API_KEY" in the App/client/index.html and App/client/src/Search/Template.jsx files with your Google Maps API Key.

# Contributors
cafFIEND was developed by:
- [Impana Chimmalagi](https://github.com/impana-c)
- [Bryan Kwan](https://github.com/Bkwan27)
- [Harsha Kosuri](https://github.com/HarshaKosuri)
- [Anish Thalamati](https://github.com/AnishThalamati)
- [Anusha Chatterjee](https://github.com/anushachatterjee)

# Acknowledgements
cafFIEND is a project that was primarily inspired by [Yelp](https://www.yelp.com/). 
