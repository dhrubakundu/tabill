var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tabill');

var Tamast = mongoose.model('tamast',mongoose.Schema({
    uname:String,
    pass:String,
    name:String,
    desig:String,
    pay:String,
    headqtr:String
    }),'tamast');

var Bill = mongoose.model('bill',mongoose.Schema({
    bno : String,
    uname:String, //Username //bill number is _id
    dt:Date,
    pur:String, //Purpose of Journey
    nr:Number, // Number of Rows
    fdt:[{type: Date}],//From Date
    ftm:[{type: Date}],//From Time
    f:[{type: String}],//From
    tdt:[{type: Date}],//To Date
    ttm:[{type: Date}],// To Time
    t:[{type: String}],//To
    mot:[{type: String}],//Mode of Travels
    fp:[{type: String}], // Fare Paid
    km:[{type: String}],//Distance in Kilometer
    hd:[{type: String}], //Halt Days
    hh:[{type: String}] // Halt Hours
    }),'bill');

/*var Btrans = mongoose.model('btrans',mongoose.Schema({
    uname:String, //Username
    bno:String, //bill number
    fdt:Date,   //From Date
    ftm:String, //From Time
    f:String,   //From
    tdt:Date,   //To Date
    ttm:String, // To time
    t:String,   // To
    mot:String, //Mode of Travel
    fp:Number, //Fare Paid
    km:Number,  //Distance in KM
    hd:Number, //Duration of Halt Day
    hh:Number,  //Duration of Halt Hour
    }),'btrans');*/

app.get('/',function(req, res){
    res.send("Hello Dhruba");
});

//Password Check
app.get('/api/pass/:N/:P',function(req, res){
    var query = {$and:[{uname:{$regex: req.params.N, $options: 'i'}},{pass:{$regex: req.params.P, $options: 'i'}}]}
      Tamast.find(query,function(err,passs){
          if(err)
              res.send(err);
              res.json(passs);      
             // console.log(passs);
      });
    });

//tabill List
app.get('/api/tabill/:U',function(req, res){
    Bill.find({uname:req.params.U},function(err,bills){
        if(err)
            res.send(err);
            res.json(bills);      
            console.log(bills);
    });
    
});
//Tabill Delete
app.delete('/api/tabill/:id',function(req, res){
    Bill.findOneAndRemove({_id:req.params.id},function(err,bill){
        if(err)
            res.send(err);
            res.json(bill);
    });
});

//tabill User check for addition
app.get('/api/tauser/:U',function(req, res){
    Tamast.find({uname:req.params.U},function(err,tausr){
        if(err)
            res.send(err);
            res.json(tausr);      
            console.log(tausr);
    });
    
});

app.get('/api/tabill1/:id',function(req, res){
    Bill.findOne({_id:req.params.id},function(err,bill){
        if(err)
            res.send(err);
            res.json(bill);
            console.log(bill)
    });
});

app.get('/api/tamast/:id',function(req, res){
    Tamast.findOne({uname:req.params.id},function(err,bill){
        if(err)
            res.send(err);
            res.json(bill);
            console.log(bill)
    });
});

app.post('/api/tabill',function(req, res){
    //var b = JSON.parse(req.body);
    Bill.create(req.body, function(err,bill){
        if(err)
            /*{
                res.status(401).json({
                    messahe : err
                });
                console.log(err);
            }
            else{
                res.status(200).json({
                    req
                });
            }*/
            res.send(err);
            res.json(bill);
    });
    /*var k=0;
    for( k=0 ; k <= req.body.nr-1 ; k++)
    {
        btransVal = {
            uname:b.uname, //Username
            bno:billno, //bill number Automatic Bill number is id of the Bill Collection
            fdt:b.fdt[k],   //From Date
            ftm:b.ftm[k], //From Time
            f:b.f[k],   //From
            tdt:b.tdt[k],   //To Date
            ttm:b.ttm[k], // To time
            t:b.t[k],   // To
            mot:b.mot[k], //Mode of Travel
            fp:b.fp[k], //Fare Paid
            km:req.body.km[k],  //Distance in KM
            hd:req.body.hd[k], //Duration of Halt Day
            hh:req.body.hh[k]  //Duration of Halt Hour    
        };
        console.log(btransval);
        Btrans.create(btransVal, function(err,bill){
            if(err)
                res.send(err);
                res.json(bill);
        });
    }*/
    //console.log(req.body);
});

    /*if(req.body.t1.length === null || req.body.t1.length == "null" || req.body.t1.length < 1)
    {
        //
    }
    else
    {*/
    /*    
    //}
    /*if(req.body.t2.length === null || req.body.t2.length == "null" || req.body.t2.length < 1)
    {
        //
    }
    else
    {*/
        /*btransVal = {
            uname:req.body.uname, //Username
            bno:billno, //bill number Automatic Bill number is id of the Bill Collection
            fdt:req.body.fdt2,   //From Date
            ftm:req.body.ftm2, //From Time
            f:req.body.f2,   //From
            tdt:req.body.tdt2,   //To Date
            ttm:req.body.ttm2, // To time
            t:req.body.t2,   // To
            mot:req.body.mot2, //Mode of Travel
            fp:req.body.fp2, //Fare Paid
            km:req.body.km2,  //Distance in KM
            hd:req.body.hd2, //Duration of Halt Day
            hh:req.body.hh2  //Duration of Halt Hour    
        };

        Btrans.create(btransVal, function(err,bill){
            if(err)
                res.send(err);
                res.json(bill);
        });
    //}    

});

/*
app.get('/api/employees',function(req, res){
    Employee.find(function(err,employees){
        if(err)
            res.send(err);
            res.json(employees);
    });
});
app.post('/api/employees',function(req, res){
    Employee.create(req.body, function(err,employee){
        if(err)
            res.send(err);
            res.json(employee);
    });
});
app.get('/api/employees/:id',function(req, res){
    Employee.findOne({_id:req.params.id},function(err,employees){
        if(err)
            res.send(err);
            res.json(employees);
    });
});
app.delete('/api/employees/:id',function(req, res){
    Employee.findOneAndRemove({_id:req.params.id},function(err,employees){
        if(err)
            res.send(err);
            res.json(employees);
    });
});
app.put('/api/employees/:id',function(req, res){
   var query = {_id:req.params.id};
   update = {
        name:req.body.name,
        dept:req.body.dept,
        area:req.body.area,
        status:req.body.status,
        contact:req.body.contact,
        salary:req.body.salary
   };
    Employee.findOneAndUpdate(query, update, function(err,employees){
        if(err)
            res.send(err);
            res.json(employees);
    });
});*/
app.listen(3001,function(){
    console.log('Server is running on port 3001');
});