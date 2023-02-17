const express = require("express");
const authenticate = require("../modules/authorization");
const router = express.Router();

//GET
router.get('/', authenticate.authorization, (req,res)=>{
    //res.send('This is root end point for Route: route1')
    res.send(`Hello User: ${req.user.name}`);
})


// //GET
// router.get('/', (req,res)=>{
//     res.send('This is root end point for Route: route1')
// })

router.get('/subroute1/:p1?', (req,res)=>{
    // res.send(dataResponse)
    try{
        var dataResponse = 'This is sub-root 1 end point for Route: route1' 
        + (req.params.p1 == null ? '' : ' and has optional parameter:' + req.params.p1)
        + (req.query.code == null ? '' : ' and has optional query parameter code:' + req.query.code);
    
        res.json({
            Message: "SUCCESS",
            Status: 1,
            Error: "",
            Data: dataResponse,
          })
    }

    catch(err){
        res.json({
            Message: "FAIL",
            Status: 0,
            Error: err,
            Data: '',
          })
    }


})

//EXPORT router
module.exports = router;