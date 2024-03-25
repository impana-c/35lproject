# cafFIEND
#### fueling your coffee craze.
Public repository link: [https://github.com/impana-c/cafFIEND](https://github.com/impana-c/cafFIEND)

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
# Starting app with shell script
You will need to be able to run bash and chmod linux command.
```
chmod u+x start.sh
./start.sh
```

# Starting app without shell script

### Installing dependencies for the client
```
pip install pymongo
python3 insert.py
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
(Assuming you are in the cafFIEND repo folder)
```
cd App/client
npm run dev
```

## Putting in Google Maps API Key
Replace "YOUR_API_KEY" in the App/client/index.html and App/client/src/Search/Template.jsx files with your Google Maps API Key.

#### If you have access:
Use an API key from [this document](https://docs.google.com/document/d/1cdZCQZ-pZaO_Nv01i6vsa9ZPhJ514rOeX-ePF-SHpeg/edit?usp=sharing)

#### Otherwise, create your own API key:
1. Go to Google’s credential page: [Credentials Page](https://console.cloud.google.com/projectselector2/google/maps-apis/credentials?utm_source=Docs_CreateAPIKey&utm_content=Docs_maps-backend&_gl=1*hokhuc*_ga*MTgxNTM2NjM0MS4xNzEwMTg2MzMy*_ga_NRWSTWS78N*MTcxMDI5MDA2MC4xLjEuMTcxMDI5MDIwMS4wLjAuMA)
2. Create a project and setup account (will ask for billing information, just fill it out it will be free).
3. Select the project you want for this app.
4. Fill out the dialog boxes and an API key should show up.
5. Copy the API key.
6. Make sure that the key is only restricted to the localhost website you open the app on (will show up when doing npm run run dev like "http://localhost:5173/searchresult")
   
# Website Preview
### SignIn
<img width="500" alt="Screen Shot 2024-03-24 at 4 43 24 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/66016d2e-51e3-4b04-a3aa-3c81708798c9">
<img width="500" alt="Screen Shot 2024-03-24 at 4 44 53 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/e6c243f6-f0de-4d73-99e7-80eac50b7965">

### Home & Search
<img width="500" alt="Screen Shot 2024-03-24 at 4 45 26 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/d418c1a6-5f82-4fea-b7f8-6553b78d3b70">
<img width="500" alt="Screen Shot 2024-03-24 at 4 46 33 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/57ac6ab0-910b-4d89-9511-1b5a269839ac">

### Coffee Shop Info & Ratings
<img width="500" alt="Screen Shot 2024-03-24 at 4 47 10 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/cf026bc0-0c20-403f-8fc3-5a3793729030">
<img width="500" alt="Screen Shot 2024-03-24 at 4 48 50 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/016e01dc-4e8b-4e6f-be20-709082ee8760">
<img width="500" alt="Screen Shot 2024-03-24 at 4 49 02 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/8395ec30-2f5f-4766-95dd-57e223db54eb">

### Top Rated
<img width="500" alt="Screen Shot 2024-03-24 at 4 49 18 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/0a6e3fdb-9dcb-4c28-821c-3f942b1c00bd">

### Profile
<img width="500" alt="Screen Shot 2024-03-24 at 4 49 54 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/84322b33-ec30-43e4-93c4-8ba014196b41">
<img width="500" alt="Screen Shot 2024-03-24 at 4 50 13 PM" src="https://github.com/impana-c/cafFIEND/assets/27794422/efc29fee-c021-4d6e-917e-0de1f7d08d8b">

# Contributors
cafFIEND was developed by:
- [Impana Chimmalagi](https://github.com/impana-c)
- [Bryan Kwan](https://github.com/Bkwan27)
- [Harsha Kosuri](https://github.com/HarshaKosuri)
- [Anish Thalamati](https://github.com/AnishThalamati)
- [Anusha Chatterjee](https://github.com/anushachatterjee)

# Acknowledgements
cafFIEND is a project that was primarily inspired by [Yelp](https://www.yelp.com/). 
