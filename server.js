import express from 'express';
import env from 'dotenv';
import cors from 'cors';

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