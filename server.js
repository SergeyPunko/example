const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();

require('./passport')(passport);

const User = require('./routes/api/user');
const Auth = require('./routes/auth/auth')(passport);

const app = express();

app.use(cors());

//body-parser middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
}));


app.use(passport.initialize());
app.use(passport.session());

//db config
const db = process.env.mongoURI;

//connect db
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('mongo connected'))
    .catch(err => console.log(err));

app.use('/api', User);
app.use('/', Auth);
app.use((req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect(process.env.REACT_HOMEPAGE+'/login')
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
