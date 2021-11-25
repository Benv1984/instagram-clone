const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')

router.post('/api/signup',(req, res)=>{
const {name,email,password,pic} = req.body
if(!email || !password || !name){
  return  res.status(422).json({error:"Please add all the fields"})
}
User.findOne({email:email}).then((savedUser)=>{
    if(savedUser){
        return  res.status(422).json({error:"User already exists with the same email"})    
    }
    bcrypt.hash(password,12)
    .then((hashedPassword)=>{
        const user = new User({
            email, 
            password:hashedPassword, 
            name,
            pic
        })
    
        user.save()
        .then((user) => {
            res.json({message: "User saved successfully"})
        })
        .catch((err) => {
            console.log(err)
        })
    })
    
    
})

})


router.post('/api/login', (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) {
      return res.status(422).json({error:"Please enter email or password"}) 
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
          return res.status(422).json({error:"Email or password is incorrecrt"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                //res.json({message:"Logged in successfuly"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token, user:{_id,name,email,followers,following,pic}})
            } else {
                return res.status(422).json({error:"Email or password is incorrecrt"})  
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router