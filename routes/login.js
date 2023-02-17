const express = require("express");
const jwt = require('jsonwebtoken');
const appconst = require("../modules/const");

const router = express.Router();

router.get('/', (req, res) => {
    console.log("KEY", appconst.secret_key);
    // For demo purposes, we will generate a token with a hard-coded user object
    const user = { name: 'Cygnux' };
    const token = jwt.sign(user, appconst.secret_key);
    res.json({ token });
  });


//EXPORT router
module.exports = router;