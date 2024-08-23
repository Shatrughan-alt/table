const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');


const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||8080;

mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>console.log("Connection successfull"))
.catch(err=>console.log(err));

const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    timestamps:true
})

const userModel=mongoose.model("User",schemaData);

// read
app.get("/",async(req,res)=>{
    const data=await userModel.find({});
    res.json({success:true,data:data});
})

// create
app.post("/create",async(req,res)=>{
    console.log(req.body);
    const data=new userModel(req.body);
    await data.save();
    res.json({ success: true, message: "data save successfully",data:data });
})


// delete
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await userModel.deleteOne({_id:id});
    res.json({success:true,message:"data deleted successfully",data:data});
    console.log(id);
})


app.listen(PORT,()=>{
    console.log("Server is running at "+PORT);
})
