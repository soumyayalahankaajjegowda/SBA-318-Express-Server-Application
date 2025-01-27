//members App
const express = require ('express');
const path = require('path'); 
const exphbs = require('express-handlebars');
 const logger = require('./middleware/logger');
 const members = require('./Members');
const app = express();


// const logger = (req, res, next) => {
//     console.log(
//         `${req.protocol}://${req.get('host')}
//          ${rmSync.originalUrl
//          }: ${moment().format()}`
//          );
//     next();
// };

// Init middleware. global middleware applied to all routes. 
app.use(logger);


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Gets All Members only log request to /api members
app.get('/api/members', (req, res) => { 
    res.json(members)
});


//Handlebars  setup using create method
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.handlebars',
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// //homepage Route for index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//Homepage Route
app.get('/', (req, res) => {res.render('index',{
    title: 'Member App',
    members: members
});
});

// About page Route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About page' });
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));