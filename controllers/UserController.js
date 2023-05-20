const User = require("../models/userModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const ApplicationError = require("../utils/ApplicationError.js");

//update:

const updateUser = catchErrorAsync(async(req,res)=>{
    console.log(req.body)
const updateRecord = await User.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
    console.log(updateRecord)
    res.status(201).json({
        status:"successful update",
        updateRecord
    })
   
    
})

//delete:
const deleteUser = catchErrorAsync(async(req,res)=>{
    const data = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"User has deleted",
    })
})

//get single user:
const displaySingleUser = catchErrorAsync(async(req,res,next)=>{
    const data = await User.findById(req.params.id);
    // if(!data){
    //     return (new ApplicationError("Data is not available"))
    // }
    res.status(200).json({
        status:"Success",
        data
    })
})

//get all user:
const displayAllUser = catchErrorAsync(async(req,res,next)=>{
    const data = await User.find();
    res.json({
        status:"Success",
        result:data.length,
        data
    })
})

//get user stats(which month user added it display month and user no) 
const userStats = catchErrorAsync(async(req,res,next)=>{
const today = new Date();
const lastYear = today.setFullYear(today.setFullYear()-1);

const data = await User.aggregate([
    {
        $project:{
           month:{$month:"$createdAt"} 
        },
    },
    {
      $group:{
        _id:"$month",
        total:{$sum:1}
      },
    },
])

res.status(200).json(data)
})

module.exports = {updateUser,deleteUser,displaySingleUser,displayAllUser,userStats}