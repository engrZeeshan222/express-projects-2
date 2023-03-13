const express = require('express');
const nlpRoute = require('./src/Routes/nlpRoute')  
const urduRoute = require('./src/Routes/urduRoute')
const app = express();
const PORT = 4000;
const geoRoute = require('./src/Routes/geoRoute')
const nodeCronRoute = require('./src/Routes/nodeCron')
const axiosRoute = require('./src/Routes/axiosRoute')
app.use(express.json());
//app.use(nodeCronRoute)
//app.use(urduRoute);
//app.use(geoRoute);
//app.use(nlpRoute)
app.use(axiosRoute);
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else {
        console.log("Error occurred, server can't start", error);
    }
}
);