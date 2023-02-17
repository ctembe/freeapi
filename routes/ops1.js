const express = require("express");
const dboperation = require("../modules/dboperation");
const jsonResponse = require("../middleware/response_json");
const endPointHandler = require("../middleware/endpointhandler");
const router = express.Router();

//GET
router.get('/', (req,res)=>{
    res.send('This is root end point for Route: ops1')
})

// router.get('/tbldata/:p1?', (req,res)=>{
//     try{
//         dboperation.op1(req.params.p1 == null ? 0: req.params.p1).then((result) => {
//           res.json(
//             {
//               Message: (result[0].Error ? "ERROR" : (result.length>0 ? "SUCCESS" : "FAIL")),
//               Status: (result[0].Error ? 0 : 1),
//               Error: (result[0].Error ? result[0].Error : ""),
//               Data: (result[0].Error ? null : (result.length>0 ? result : null))
//             }
//           );
//           });
//     }

//     catch(err){
//         //IF ERROR IN ROUTE
//         res.json({
//             Message: "Error",
//             Status: 0,
//             Error: err,
//             Data: null,
//           })
//     }
    
// })

// Endpoint Handler
router.get('/tbldata/:p1?', (req, res, next) => {
  dboperation.op1(req.params.p1 == null ? 0 : req.params.p1)
    .then((result) => {
      res.locals.dbresult = result;
      next();
    })
    .catch((err) => {
      res.locals.dbresult = [];
      res.locals.dbresult[0] = { Error: err.message };
      next();
    });
}, jsonResponse, endPointHandler);


// Endpoint Handler
router.get('/custlist/:p1?', (req, res, next) => {
  dboperation.op2(req.params.p1 == null ? '' : req.params.p1)
    .then((result) => {
      res.locals.dbresult = result;
      next();
    })
    .catch((err) => {
      res.locals.dbresult = [];
      res.locals.dbresult[0] = { Error: err.message };
      next();
    });
}, jsonResponse, endPointHandler);


// router.get('/custlist/:p1?', (req,res)=>{
//   try{
//       dboperation.op2(req.params.p1 == null ? '': req.params.p1).then((result) => {
//             res.json(
//             {
//               Message: (result[0].Error ? "ERROR" : (result.length>0 ? "SUCCESS" : "FAIL")),
//               Status: (result[0].Error ? 0 : 1),
//               Error: (result[0].Error ? result[0].Error : ""),
//               Data: (result[0].Error ? null : (result.length>0 ? result : null))
//             }
//           );
//           });
//   }

//   catch(err){
//       //IF ERROR IN ROUTE
//       res.json({
//           Message: "Error",
//           Status: 0,
//           Error: err,
//           Data: null,
//         })
//   }
  
// })


//EXPORT router
module.exports = router;