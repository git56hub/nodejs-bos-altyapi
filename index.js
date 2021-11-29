const express = require('express');
const app = express();
const config = require("./config");
const mongoose = require('mongoose');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const flash = require("connect-flash")
const connectMongo = require('connect-mongo');
const path = require("path");
const fileUpload = require("express-fileupload");
const layout = require("express-ejs-layouts");
const PORT = config.port || 3000;
const dbURL = config.dbURL;
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(layout);
app.set("layout", "./inc/layout");
app.use(express.static("./public"))

app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  store: connectMongo.create({ mongoUrl: dbURL })
}))

app.use(fileUpload());
app.use(flash());

  app.listen(PORT)
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then((result) => {
  console.log('Site hazır !')
})
.catch((error) => {
console.log('Site hazır değil !')
})

app.use(require('./routers/main'));
app.use('/posts', require('./routers/posts'));

//404 sayfası
app.use(function (req, res, next) {
  res.status(404).send("Sayfa Bulunamadı !")
})