// *************** enables use of files to link *********************
var express = require("express");

// *************** bodyParser enables getting data from post methods ******************
var bodyParser = require('body-parser');

var session = require('express-session');

var app = express();

app.get('/', function(request, response) {
    response.send("<h1>Hello Express</h1>");
})

app.use(express.static(__dirname + "/static"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: 'codingdojorocks'}));

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.get("/users", function (request, response) {
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})

// *********************** Get Method ****************************
app.get("/users/:id", function (req, res) {
    console.log("The user id requested is: ", req.params.id);
    res.send("You requested the user with id: " + req.params.id);
});

// *********************** Post Method ***************************
app.post('/users', function(req, res){
    console.log("pose data \n\n", req.body)
    req.session.name = req.body.name;
    console.log(req.session.name);

    res.redirect('/')
});

console.log(__dirname);

app.listen(8000, function() {
    console.log("listening on port 8000");
})

