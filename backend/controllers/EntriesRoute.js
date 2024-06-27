const express = require("express");
const route = express.Router();
const entriesSchema = require("../model/EntriesSchema");

route.post("/add-name", async (req, res, next) => {     
    try {
      const { user, password } = req.body;
      const checkuserexist= await entriesSchema.findOne({user})
      if(checkuserexist){
        return res.status(400).json({ message: "Username already exists" });
        return;
      }
      const newEntry = await entriesSchema.create({ user, password });
      return res.status(200).json({ message: "Account Created Succesfully" });
    } catch (error) {
      next(error); // Pass any error to the next error-handling middleware
    }
  });
  route.get("/get-name", async (req, res, next) => {
    const { user } = req.query;
    try {
        const entry = await entriesSchema.findOne({ user });
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json(entry);
    } catch (error) {
        next(error);
    }
});
     route.put("/update-password",async (req,res,next)=>{
        const { user } = req.body;
        try{
            const finduser= await entriesSchema.findOne({user});
              if(!finduser){
                return res.status(404).json({message:"usser name dose not exist"})
              }
              res.json(finduser);
        }catch(error){
            next(error);
        }
     })
     route.put('/change-pass',async(req,res,next)=>{
        const {user,password}=req.body;
        try{
            const finduser= await entriesSchema.findOne({user});
            // await finduser.save();
            if(!finduser){
                return res.status(404).json({message:"user name dose not exist"})
                }
                finduser.password=password;
                await finduser.save();
                return res.status(200).json({message:"password has be changed"})
            }catch(error){
                next(error);
            }
     })
     route.delete('/delete-user', async (req, res, next) => {
        const { user } = req.query;
        try {
            const findUser = await entriesSchema.findOne({ user});
        if(!findUser){
            return res.status(404).json({ message: "User not found" });
        }
        await entriesSchema.deleteOne({ user });
        res.json({ message: "User deleted successfully" });
        }catch(err){
            next(err);
        }
     })
     route.post('/login',async (req,res,next)=>{
        const {user,password}=req.body;
        try{
            const finduser=await entriesSchema.findOne({user})
            if(!finduser)
                {
                    return res.status(400).json({message:"incorrect username"})
                }
                else if(password!==finduser.password){
                    return res.status(400).json({message:"incorrect password"})
                }
                else{
                return res.status(200).json({message:"login succesfull"})
                }
            }
            catch(err){
                next(err);
            }
     })
    
  module.exports = route;