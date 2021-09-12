const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const contactUtils = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

//third party middle ware
app.use(expressLayouts);
app.use(morgan('dev'));

app.set('layout', 'layouts/main-layout');
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}))
app.use(flash());

//middle ware

//byuild in middle ware
app.use(express.static('public'));


app.get('/', (req, res) => {

    res.render('index', { nama: 'wahyu', title: 'Halaman Home' });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category} `);
})
// example => http://localhost:3000/product/21?category=shoe

app.get('/about', (req, res) => {
    res.render('about', { nama: 'wahyu', title: 'Halaman About' });
});

app.get('/contact', (req, res) => {
    const contacts = contactUtils.loadContact();

    res.render('contact', { title: 'Halaman Contact', contacts: contacts, msg: req.flash('msg') });
});

app.get('/contact/add', (req, res) => {
    res.render('add-contact', { title: 'Halaman Tambah Contact' });
});



app.get('/contact/delete/:nama', (req, res) => {
    const contact = contactUtils.findContact(req.params.nama);
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        contactUtils.deleteContact(req.params.nama);
        console.log(req.body)
        //res.send('data berhasil disimpan');
        req.flash('msg', 'data kontak berhasil dihapus');

        res.redirect('/contact');
    }
});

app.get('/contact/edit/:nama', (req, res) => {
    const contact = contactUtils.findContact(req.params.nama);
    res.render('edit-contact', { title: 'Halaman Edit Contact', contact: contact });
});


// proses data baru

app.post('/contact/update', [
    body('nama').custom((value, {req}) => {
        const duplikat = contactUtils.isDuplikat(value);
        
        if (duplikat && value !== req.body.oldnama) {
            throw new Error('Nama contact sudah digunakan');

        }
        return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({errors: errors.array()});
        console.log(req.body);
        res.render('edit-contact', {
            title: 'Form Ubah Data Contact',
            errors: errors.array(),
            contact: req.body,
        });


    } else {

        req.flash('msg', 'data kontak berhasil diubah');
        contactUtils.updateContacts(req.body);
        res.redirect('/contact');
        //res.send('data berhasil disimpan');
        
    }
});

app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = contactUtils.isDuplikat(value);
        if (duplikat) {
            throw new Error('Nama contact sudah digunakan');

        }
        return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({errors: errors.array()});
        res.render('add-contact', {
            title: 'Form Tambah Data Contact',
            errors: errors.array(),
        });

    } else {

        console.log(req.body)
        //res.send('data berhasil disimpan');
        req.flash('msg', 'data kontak berhasil ditambahkan');
        contactUtils.addContact(req.body);
        res.redirect('/contact');
    }
});

app.get('/contact/:nama', (req, res) => {
    const contact = contactUtils.findContact(req.params.nama)

    res.render('detail', { title: 'Halaman Detail Contact', contact: contact });
});


app.use('/', (req, res) => {
    res.status('404');
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
