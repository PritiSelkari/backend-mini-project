const mongoose =require('mongoose')

const schema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min: 8,
        max:16
    },
    image:{
        type:String,
    }
},{timestamp: true})

const user = mongoose.model("user", schema)

user.addUser= async (userData) =>{
    return await user.create(userData)
}
 user.fetchAllUsers = async() =>{
    return await user.find()
 }

 user.editUser = async(Id, data)=>{
    return await user.findByIdAndUpdate(Id, data)
 }

 user.deleteUser =async(Id) =>{
       return await user.findByIdAndDelete(Id)
 }

 user.fetchUser= async(Email)=>{
    return await user.findOne({email:Email})
 }
module.exports = user