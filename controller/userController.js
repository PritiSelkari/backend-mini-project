const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')
const userModel = require('../models/user');
const user = require('../models/user');
 

exports.register= async (req,res)=>{
    try{
        let {name,email,password}  = req.body;
        if (!name||!email||!password) return res.status(400).send({message:"Required field is missing"})
        if (password.length < 8) return res.status(400).send({message:"Password must contain minimum 8 character"})
        let user = await userModel.fetchUser(email)
        if (user) return res.status(400).send({message:"Email is already registered"})
        let salt = await bcrypt.genSalt(5)
        let hashpassword= await bcrypt.hash(password,salt)
        let userData = {name,email,password:hashpassword}
        let data = await userModel.addUser(userData)
        res.status(200).send({message:"Successfully registered", data: data})
        return
    }catch(err){
        res.status(500).send({message: err.message ? err.message : err})
        return
    }
}

exports.login= async (req,res)=>{
    try{
        let {email,password} = req.body;
        if (!email||!password) return res.status(400).send({message:"Required field is missing"})
        let data = await userModel.fetchUser(email)
        if (!data) return res.status(400).send({message:"Email is not registered"})
        let ismatch = await bcrypt.compare(password,data.password)
        if (!ismatch) return res.status(400).send({message:"Invalid credentials"})
        let token = await jwt.sign({email:data.email,id: data._id},"secure-key")
        res.status(200).send({message:"Logged in successfully", token:token})
        return            
    }catch(err){
        res.status(500).send({message: err.message ? err.message : err})
        return
    }
}

exports.fetchAllUsers= async (req,res)=>{
    try{
        let userData = await userModel.fetchAllUsers()
        res.status(200).send({message:"Successfully fetched the users data", data:userData})
        return
    }catch(err) {
        return res.status(500).send({message: err.message ? err.message : err})
    }
}

exports.deleteUser= async(req,res)=>{
    try{
        let {id} = req.params
        if(!id) return  res.status(400).send({message:"User Id is required"})
        let deletedUser =  await userModel.deleteUser(id)
        res.status(200).send({message:"Successfully deleted the user", data:deletedUser})
        return
    }catch(err){     
       return res.status(500).send({message: err.message ? err.message : err})
    }
}

exports.updateUser = async (req,res)=>{
    let {email, name, password,id} = req.body,
    obj = {};
    if(!id) return  res.status(400).send({message:" User Id is required"})
    try{
        (email) && (obj.email = email);
        (name) && (obj.name = name);
        (password) && (obj.password = password);
        let updatedData = await userModel.editUser(id,{$set:obj})
        res.status(200).send({message:"Successfully updated the user", data:updatedData})
        return
    }catch(err){
        return res.status(500).send({message: err.message ? err.message : err})
    }
}