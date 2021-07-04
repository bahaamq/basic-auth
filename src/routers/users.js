const express = require('express');

const UserModule = require('../models/users');

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const validator = require('../middlewares/validator');
const router = express.Router();

router.post('/signin', validator, authuser);

router.post('/signup',async (req, res,next) => {
    try {

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const exist = await UserModule.findOne({ username: req.body.username }); //null
        if (exist) throw new Error('User exist');
        const user = new UserModule(req.body);
        const doc = await user.save();
        res.status(201).json(doc);
      } catch (error) {
        res.status(403).json({ message: error.message });
      }
    });


function authuser(req, res) {
 
 
        res.status(200).json(req.user);
 
}

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo


module.exports = router;