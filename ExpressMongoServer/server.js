let express = require('express');
let bodyParser = require('body-parser')
let requester = require('request');
let apikey = require('./apikey.js');
let app = express();

app.use(bodyParser.json())
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

let mongoose = require('mongoose');
let db = mongoose.connect('mongodb://localhost/server', {useNewUrlParser : true});

let StockSchema = new mongoose.Schema({
    name: String,
    symbol : String,
    price : Number
})

let Stock = mongoose.model('Stock',StockSchema);

let BoughtSchema = new mongoose.Schema({
    symbol: String,
    price : Number,
    date : String
})

let Bought = mongoose.model('Bought',BoughtSchema);

let SoldSchema = new mongoose.Schema({
    symbol: String,
    priceBought : Number,
    priceSold : Number,
    dateBought : String,
    dateSold : String,
    gain : Number
})

let Sold = mongoose.model('Sold',SoldSchema);

//let Stock = mongoose.model('Stock',StockSchema);


/*let s = new Bought({
    symbol : "AAPL",
    price : 12.3
});
s.save();*/

app.get('/', (request,response) => {
    response.send("Je suis la racine du monde des anciens...")
})

//On définit les deux fonctions sur la même route
app.route('/stocks')
.get((request,response,next) => {
    Stock.find({},(err,stocks) => {
        if(err){
            return next(err);
        } else{
            response.json(stocks);
        }
    }); // Fonction de callback bc async
})
.post((request,response,next) => {
    let stock = new Stock(request.body);
    stock.save((err) => {
        if(err){
            return next(err);
        } else {
            response.json(stock);
        }
    });
})

//On définit les deux fonctions sur la même route
app.route('/bought')
.get((request,response,next) => {
    Bought.find({},(err,boughts) => {
        if(err){
            return next(err);
        } else{
            response.json(boughts);
        }
    }); // Fonction de callback bc async
})
.post((request,response,next) => {
    let bought = new Bought(request.body);
    console.log(request.body)
    bought.save((err) => {
        if(err){
            return next(err);
        } else {
            response.json(bought);
        }
    });
})

app.route('/bought/:id')
.get((request,response,next) => {
    var id = request.params.id
    Bought.findById(id,(err,boughts) => {
        if(err){
            return next(err);
        } else{
            response.json(boughts);
        }
    }); // Fonction de callback bc async
})
.put((request,response,next) => {
    var id = request.params.id
    console.log(request.body)
    Bought.remove({_id : id},(err,boughts) => {
        if(err){
            return next(err);
        } else{
            response.json(boughts);
        }
    });
})

app.route('/sold')
.get((request,response,next) => {
    Sold.find({},(err,solds) => {
        if(err){
            return next(err);
        } else{
            response.json(solds);
        }
    }); // Fonction de callback bc async
})
.post((request,response,next) => {
    let sold = new Sold(request.body);
    console.log(request.body)
    sold.save((err) => {
        if(err){
            return next(err);
        } else {
            response.json(sold);
        }
    });
})



app.route('/api/daily/:symbol')
.get((request,response,next) => {
    let symbol = request.params.symbol;
    requester('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey='+apikey.key, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    response.json(body);
    });
})



app.route('/api/daily/')
.get((request,response,next) => {
    requester('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey='+apikey.key, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    response.json(body);
    });
})

app.use(express.static('./public'));

app.listen(3000);
console.log("Server running...")


// app.get() app.route("").get().post().put()....
// request.query  param(name)  .cookies
// response .json    send   status (Code erreur) cookies redirect


//fragment EMBER