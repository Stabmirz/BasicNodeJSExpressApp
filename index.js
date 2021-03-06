const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


// Set public folder as root
app.use(express.static('public'));

app.set('view engine', 'ejs');

// var myself = require('./myself');



// app.use('/myself', myself);

app.get('/', (req,res)=>{
    return res.render('index');
})

app.get('/state', (req, res)=>{
    return res.render('state',{stateName:null});
})

app.post('/state', (req, res)=>{
    let stateCode = req.body.stateCode; // typeof(stateCode) is string

    let myObj = {
        'AA':'Armed Forces America',
        'AE':'Armed Forces',
        'AP':'Armed Forces Pacific',
        'AK':'Alaska',
        'AL':'Alabama',
        'AR':'Arkansas',
        'AZ':'Arizona',
        'CA':'California',
        'CO':'Colorado',
        'CT':'Connecticut',
        'DC':'Washington DC',
        'DE':'Delaware',
        'FL':'Florida',
        'GA':'Georgia',
        'GU':'Guam',
        'HI':'Hawaii',
        'IA':'Iowa',
        'ID':'Idaho',
        'IL':'Illinois',
        'IN':'Indiana',
        'KS':'Kansas',
        'KY':'Kentucky',
        'LA':'Louisiana',
        'MA':'Massachusetts',
        'MD':'Maryland',
        'ME':'Maine',
        'MI':'Michigan',
        'MN':'Minnesota',
        'MO':'Missouri',
        'MS':'Mississippi',
        'MT':'Montana',
        'NC':'North Carolina',
        'ND':'North Dakota',
        'NE':'Nebraska',
        'NH':'New Hampshire',
        'NJ':'New Jersey',
        'NM':'New Mexico',
        'NV':'Nevada',
        'NY':'New York',
        'OH':'Ohio',
        'OK':'Oklahoma',
        'OR':'Oregon',
        'PA':'Pennsylvania',
        'PR':'Puerto Rico',
        'RI':'Rhode Island',
        'SC':'South Carolina',
        'SD':'South Dakota',
        'TN':'Tennessee',
        'TX':'Texas',
        'UT':'Utah',
        'VA':'Virginia',
        'VI':'Virgin Islands',
        'VT':'Vermont',
        'WA':'Washington',
        'WI':'Wisconsin',
        'WV':'West Virginia',
        'WY':'Wyoming'
        // WY:'Wyoming' //  this works as well without quotation

    }

    if(stateCode in myObj){

        console.log(myObj[stateCode]);

        let stateName = myObj[stateCode];

        return res.render('state',{stateName: stateName});
    }else{
        return res.render('state',{stateName: 'Wrong Input. Please insert the correct State Code'});
    }

    
})

app.get('/about', (req,res)=>{
    return res.render('about', {name : 'Abi'});
})
app.get('/contact', (req,res)=>{
     res.render('ContactUs', {result : null});
})

app.post('/contact', (req, res)=>{
    let firstName = req.body.firstName;
    let stateCode = req.body.stateCode; // typeof(stateCode) is string

    console.log(firstName);
     res.render('ContactUs', {result : firstName});
})

app.use(express.static(__dirname + '/public'));
app.get('/chat', function (req, res) {
 res.sendfile(__dirname + '/public/index.html');
});

const server = app.listen(3000);
const io = require('socket.io').listen(server);

var usernames = {};
io.sockets.on('connection', function (socket) {
 socket.on('sendchat', function (data) {
 io.sockets.emit('updatechat', socket.username, data);
 });

 socket.on('adduser', function(username){
 socket.username = username;
 usernames[username] = username;
 socket.emit('updatechat', 'SERVER', 'you have connected');
 socket.broadcast.emit('updatechat', 'SERVER'
 , username + ' has connected');
 io.sockets.emit('updateusers', usernames);
 });

 socket.on('disconnect', function(){
 delete usernames[socket.username];
 io.sockets.emit('updateusers', usernames);
 socket.broadcast.emit('updatechat', 'SERVER'
 , socket.username + ' has disconnected');
 });
});