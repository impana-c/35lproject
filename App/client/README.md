# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Installing dependencies for the client
cd App/client
npm install
npm i express cors mongoose dotenv nodemon concurrently 
npm install react-icons bootstrap axios react-router-dom 

### Installing dependencies for the server
cd ../server
npm init -y
npm install express mongoose cors nodemon

### Starting the app
(make sure to run: 
    sudo killall -9 node on terminal 
if any node processes were previously running)

cd App/client
npm run dev
