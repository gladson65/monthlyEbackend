import express from 'express';
import mongoose from 'mongoose'
import env from 'dotenv';
import cors from 'cors';
import { monthlyERoutes } from './Routes/monthlyEroutes.js';

// configuring env
env.config();

// creating a server
const monthlyServer = new express();
const port = process.env.PORT;
monthlyServer.listen(port, ()=> {
    console.log(`server is running on the port ${port}`);
})

// json parse middleware
monthlyServer.use(express.json());
// cors middleware
monthlyServer.use(cors());


// MongoDB database connection code
// Atlas database url
const mongoUrl = process.env.MongoUrl;
mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000
}).catch(error => console.log(error.reason));
// check database connection;
const db = mongoose.connection;
db.on("open", ()=> {
    console.log("Database connection is successful")
});
db.on("error", ()=> {
    console.log("Database connection is not successful");
})


// shared monthlyServer to the routes
monthlyERoutes(monthlyServer); 