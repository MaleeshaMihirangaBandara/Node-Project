var express = require('express');
var mongoose = require('mongoose');
var router = require('./routes/routes');
var config = require('./configs/congig');
var server = express();
server.use(express.json());

// server.use(router);
server.use(router);

// Starting server On port 3000...
server.listen(config.port,(error)=>{
    try{
        if(error){
            console.log('server is not started...!');
        }else
            console.log('server started...');
    }
    catch(Error){
        console.log('something went wrong...!');
    }
});

// Connect to the database...
mongoose.connect(config.connectionSrting,{ useNewUrlParser: true },(error)=>{
    try {
        if(error){
            console.log("db is not connected...!");
        }else{
            console.log("db is connected succesfull...");
        }     
    } catch (error) {
        console.log("Something Went wrong...!");       
    }
});