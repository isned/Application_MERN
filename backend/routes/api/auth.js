const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Login user
// @access  Public
router.post("/login-user", (req, res) => {
  let { email, password } = req.body;
  

  if (!email || !password)
    return res.status(400).send({ msg: "Please enter all data | body : "+JSON.stringify(req.body) });

  User.findOne({ email: email }).then((user) => {
    if (!user) 
    return res.status(400).send({ status:"usernotok",msg: "User does not exist" });
   

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).send({ status:"passnotok",msg: "Mot de passe incorrect" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpire") },
        (err, token) => {
          if (err) throw err;
          return res.status(400).send({ status:"ok",msg: "ok" });
         
        }
      );
    });
  });
});
module.exports = router;
