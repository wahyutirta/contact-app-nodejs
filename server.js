const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout')

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
    res.render('contact', {nama : 'wahyu', title : 'Halaman Contact'});
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