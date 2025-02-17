//Server starting

import http from "http";
import app from "./app.js";
const port = process.env.PORT ||8080;

//server creation

const server = http.createServer(app);

server.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})