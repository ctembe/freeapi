const jwt = require('jsonwebtoken');
const appconst = require("./const");

// Middleware function to authenticate user
exports.authorization = function (req, res, next) {
    // Get the authorization header from the request
    const authHeader = req.headers['authorization'];
    // If the header is present, extract the token
    const token = authHeader && authHeader.split(' ')[1];
    // If the token is null or undefined, return a 401 error
    if (token == null) return res.sendStatus(401);
    // Verify the token using your secret key
    jwt.verify(token, appconst.secret_key, (err, user) => {
      // If the token is invalid, return a 403 error
      if (err) return res.sendStatus(403);
      // Set the user to the request object to be used in other middleware
      req.user = user;
      // Call the next middleware function
      next();
    });
  }