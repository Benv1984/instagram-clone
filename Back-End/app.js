const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const PORT =process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')

app.use(cors())

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo');
})
mongoose.connection.on('error',(err)=>{
console.log('err connecting',err);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV =='production'){
    app.use(express.static('Front-End/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'Front-End', 'build', 'index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})
