const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const contactUtils = require('./utils/contacts');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');

//third party middle ware
app.use(expressLayouts);
app.use(morgan('dev'))
 
app.set('layout', 'layouts/main-layout')

//middle ware

 //byuild in middle ware
app.use(express.static('public'));


app.get('/', (req, res) => {

    res.render('index', {nama : 'wahyu', title : 'Halaman Home'});
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category} `);
})
// example => http://localhost:3000/product/21?category=shoe

app.get('/about', (req, res) => {
    res.render('about', {nama : 'wahyu', title : 'Halaman About'});
});

app.get('/contact', (req, res) => {
    const contacts = contactUtils.loadContact();
    
    res.render('contact', {nama : 'wahyu', title : 'Halaman Contact', contacts: contacts});
});

app.get('contact/add', (req, res) => {
    res.render('add-contact', { title : 'Halaman Tambah Contact'});
});

app.get('/contact/:nama', (req, res) => {
    const contact = contactUtils.findContact(req.params.nama)
    
    res.render('detail', { title : 'Halaman Detail Contact', contact: contact});
});


app.use('/', (req, res) => {
    res.status('404');
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type' : 'text/html',
//     });
//     res.write('hello world');
//     res.end();
// }).listen(port, () => {
//     console.log(`server is listening on port ${port}...`);
// });