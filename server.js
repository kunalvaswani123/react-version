console.log('Server-side code running');
const express = require('express');
const mongoose = require('mongoose');
const multer  = require('multer');
var cors = require('cors');
var upload = multer({ dest: 'uploads/' });

var fs = require('fs');
var Schema = mongoose.Schema;

const app = express();
app.use(express.static(__dirname));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myapp', {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(8000, () => {
        console.log('listening on 8000');
    });
});

function sendUser (user, res) {
    db.collection('users').find({"name": user}).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
}

app.post('/postData', upload.single('myfile'), function (req, res, next) {
    let imgData;
    if (req.file == undefined)
        imgData = null;
    else {
        let imgPath = req.file.path;
        imgData = fs.readFileSync(imgPath);
    }
    let timeLatest = 2;
    var newDoc = {
        name: req.query.user,
        time: timeLatest,
        content: req.body['search'],
        img: { 
            data: imgData, 
            contentType: 'image/png' 
        }
    };
    db.collection('posts').insertOne(newDoc, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

app.post('/addUser', upload.single('myfile'), function (req, res, next) {
    let imgPath;
    if (req.file == undefined)
        imgPath = "src/images/user.png";
    else
        imgPath = req.file.path;
    let imgData = fs.readFileSync(imgPath);
    var newDoc = {
        name: req.query.user,
        img: { 
            data: imgData, 
            contentType: 'image/png' 
        }
    };
    db.collection('users').find({"name": req.query.user}).toArray((err, result) => {
        if (err) return console.log(err);
        if (result.length) {
            if (req.query.update == "yes") {
                db.collection('users').updateOne({"name": req.query.user}, {$set: newDoc}, (err, result) => {
                    if (err) return console.log(err);
                    res.send(result);
                });
            }
            else sendUser(req.query.user, res);
        }
        else {
            newDoc.posts = [];
            db.collection('users').insertOne(newDoc, (err, result) => {
                if (err) return console.log(err);
                res.send(result);
            });
        }
    });
});

app.post('/changeLike', (req, res) => {
    let postObj = {
        "posts": req.query.id
    }
    if (req.query.status === "Unlike") {
        db.collection('users').updateOne({"name": req.query.user}, {$addToSet: postObj}, (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    }
    else {
        db.collection('users').updateOne({"name": req.query.user}, {$pull: postObj}, (err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(__dirname + '/dist/bundle.js');
});

app.get('/*.(png|svg|jpg|gif)', (req, res) => {
    res.sendFile(__dirname + '/dist' + req.path);
});

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/src/html/login.html');
// });

// app.get('/profile', (req, res) => {
//     res.sendFile(__dirname + '/src/html/profile.html');
// });

app.get('/giveGroupsData', (req, res) => {
    if (req.query.len == 'all') {
        db.collection('groups').find().toArray((err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    }
    else {
        var len = parseInt(req.query.len);
        db.collection('groups').find().limit(len).toArray((err, result) => {
            if (err) return console.log(err);
            res.send(result);
        });
    }
});

app.get('/givePostData', (req, res) => {
    let pattern = new RegExp(req.query.stringToMatch, 'i');
    let user = req.query.userToMatch;
    queryObject = {
        "content": pattern
    }
    if (user != undefined)
        queryObject["name"] = user;
    db.collection('posts').find(queryObject).sort({ time: 1 }).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

app.get('/getUser', (req, res) => {
    sendUser(req.query.user, res);
});

app.get('/checkLike', (req, res) => {
    db.collection('users').find({"name": req.query.user, "posts": req.query.id}).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});
