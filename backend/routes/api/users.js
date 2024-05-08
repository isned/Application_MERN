const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");




router.post("/register",(req,res)=>{
    let {name,email,password,role='user'}=req.body;

    if(!name||!email||!password||!role)
        return res.status(400).send({msg:"please enter all data"});
    User.findOne({email:email}).then((user)=>{
        if(user) return res.status(400).send({msg:"Email already exist"});
    });
    let newUser=new User({name,email,password,role});

//remplacer un seul caractere par 10 caraceteres  au niveau de cryptage
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err;
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if (err) throw err;
            newUser.password=hash;
            newUser.save().then((user)=>{
                jwt.sign(
                    {id:user.id},
                    config.get("jwtSecret"),
                    {
                        expiresIn:config.get("tokenExpire")
                    },
                    (err,token)=>{
                        if(err)throw err ;
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email,
                                role:user.role,
                            },
                        });
                    }
                );
            });
        });
    });
});


// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get("/", (req, res) => {
    User.find().then((users) => res.json(users));
  });


// @route   PUT api/users
// @desc    Update user
// @access  Private
router.put("/maj/:id",async(req,res)=>{
    try{
        await User.findOneAndUpdate(
            {_id:req.params.id},
            {name:req.body.name},
            );
        res.send("Mise à jour avec succès")
       
        
    }
    catch(err){
        console.log(err);
    }

});


// @route   POST api/users
// @desc    Delete user
// @access  Private && ADMIN
router.delete("/supprimer/:id",async(req,res)=>{
    
    try{
        await User.findOneAndDelete({_id:req.params.id})
        res.send("supprimé avec succès")
       
    }
    catch(err){
        console.log(err);
    }

});



module.exports = router;