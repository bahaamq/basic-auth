'use strict';
const express = require('express');
const userauth = require('./routers/users');



const app = express();


app.use(express.json())

app.use('/user', userauth);


module.exports = {
    server:app,
    start:(port)=>{
      app.listen(port,()=>console.log(`Listening on ${port}`))
    }
  }