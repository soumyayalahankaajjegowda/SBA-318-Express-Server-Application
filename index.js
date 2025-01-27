//members App
const express = require ('express');
const path = require('path'); 
const exphbs  = require('express-handlebars');
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

// Init middleware
app.use(logger);


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Gets All Members
app.get('/api/members', (req, res) => res.json(members));

// app.get('/api/members',(req, res) => {
//     res.json(members)
// })

//Handlebars  setup using create method
const hbs = exphbs.create({
    defaultLayout: 'main',
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//Homepage Route
app.get('/', (req, res) => res.render('index',{
    title: 'Member App',
    members
}));

// About page Route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About page' });
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));