const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true },err =>{
  if(err){
    console.error('___________________Error of connection to database!')
    console.log(err)
  }else{
    console.log('______________________connected to mongodb')
  }
})

app.use(bodyParser.json());
app.use(cors());

app.use('/files', express.static('./uploads'));

//Import Routes 
const files = require('./routes');
app.use('/file',files);


app.listen(3000);