const express = require("express");
const dt = require("./modules/firstmodule");
const bodyParser = require("body-parser");
const appcont = require("./modules/const")



const app = express();
//--
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--

//const PORT = 3000;
const PORT = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
//   })


// app.use((req,res, next)=>
// {
//     console.log("I am middleware on all request");
//     next();
// })


//THIS MIDDLEWARE WILL HIT FOR GIVEN END POINT HAVING GET METHOD
app.get('/newendpoint',(req,res, next)=>
{
    console.log("I am middleware @ New End Point");
    next();
}
)

//THIS MIDDLEWARE WILL HIT FOR ALL END POINTS HAVING GET METHOD
//IF THIS IS PLACED FIRST, ABOVE MIDDLEWARE WILL BE IGNORED
app.get('*',(req,res, next)=>
{
    console.log("I am middleware for ALL GET End Points");
    next();
}
)





app.use('/greeting/:p1?', (req, res, next) => {
    console.log("KEY",appcont.secret_key);
    if(req.params.p1 == null) {
        res.send("PARAMATER EXPECTED...");
    } else {
        res.send(req.params.p1);
    }
    
    //console.log('Request Type:', req.method)
    next()
})

// -------------------------
// 3 DIFFERENT OUTPUTS 
// -------------------------

//1. SEND JSON
app.get('/', (req, res) => {
    res.json({
        Message: "Hello World",
        Date: dt.mod_dt(),
      })
});

//2. SEND HTML
// app.get('/', (req, res) => {
//     console.log(__dirname);
//     res.sendFile(__dirname + '/htmls/index.html');
//   });

//3. SEND TEXT
// app.get('/', (req, res) => {
//     res.send('Hello, World! @ ' + dt.myDateTime());
// });


// -------------------------
// INPUTS 
// -------------------------


//INLINE `GREETING` ROUTE WITH SUBROUTE `BOSS`
//AS THIS ROUTE IS FIRST IN SEQUENCE
//IT WILL ALWAYS HAVE FIRST PREFERENCE OVER NEXT `GREETING` ROUTE WITH PARAMETER
app.get('/greeting/boss', (req, res) => {
    //PLAIN TEXT OUTPUT
    res.send('YES BOSS!!!');
});

//INLINE ROUTE WITH OPTIONAL PARAMETER
app.get('/greeting/:p1?', (req, res) => {
    //PLAIN TEXT OUTPUT
    res.send('My Greetings!!! ' + (req.params.p1 == null ? "No Parameter": req.params.p1));
});

//INLINE ROUTE WITH QUERY STRING & JSON BODY
// JSON BODY BE LIKE
// {
//  "myname":"chaitanya"
// }
app.get('/sayhello/', (req, res) => {
    let output = `Say Hello To `;

    //CUSTOM LOGIC TO HANDLE INPUT TO GENERATE OUTPUT
    if(req.body.myname != null){
        //output = output + req.body.myname;
        output = `Say Hi-Hello To ${req.body.myname}`;
    } else{
        output = output + (req.query.name == null ? "UNKNOWN PERSON": req.query.name)
    }
    
    res.send(output);   //PLAIN TEXT OUTPUT
});

app.get('/newendpoint', (req,res)=> {res.send("I am a new end point.")})


// -------------------------
// ROUTER
// -------------------------

//routes
const route1Router = require("./routes/route1");
app.use("/route1", route1Router);

//routes
const route2Router = require("./routes/ops1");
app.use("/ops1", route2Router);

//routes
const route3Router = require("./routes/login");
app.use("/login", route3Router);


// -------------------------
// KEEP APP LISTEN ON PORT SPECIFIED
// -------------------------
app.listen(PORT);
console.log("App Listening..." + PORT);