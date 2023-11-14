const express = require("express");
const PerfexUsersData = require("../models/perfexUsers")
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtAuth = require("../middleware/jwtAuth")

router.get("/", (req, res) => {
    res.send("This is Authentication Router Page")
});

router.post("/signup", async (req, res) => {

    
    try {
        const isUserExist = await PerfexUsersData.findOne({ email: req.body.email })
        console.log(isUserExist)
        if (!isUserExist) {
            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "phoneNumber": req.body.phoneNumber,
                "gender": req.body.gender,
                "password": req.body.password,
                "confirmPasword": req.body.confirmPasword
            };
            const userDetails = await PerfexUsersData.create(newUser)   //  POSTING TO COLLECTION OR MODEL
            console.log(userDetails)
PerfexUsersData
            res.status(200).send("user created successfully")

        } else {

            // if user mail id is founded send below response
            res.status(400).json("user already registered")

        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json("message: e.message")

    }
});
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const isUserExist = await PerfexUsersData.findOne({ email: email });
      if (!isUserExist) {
  
        return res.status(400).json({ message: "User Email Not Found" })
      }else{
          const payload = {
            id: isUserExist._id
          }
  
          let token = jwt.sign(payload, 'Ramya', { expiresIn: '24hr' })
          console.log(token);
          return res.status(200).json({ message: "Login Success", token: token });
      }
      
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server error" });
    }
  });





module.exports = router;