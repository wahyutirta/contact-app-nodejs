const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');


if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
    fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
}
if (!fs.existsSync('./data/contacts.json')) {
    fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
}

const pertanyaan = (Question) => {
    return new Promise((resolve, reject) => {
        rl.question(Question, (answear) => {
            resolve(answear);
        });
    });
};

const loadContact = (nama, email, noHp) =>{
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    //rubah apapun isi file dalam bentuk json
    const contacts = JSON.parse(file);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

module.exports = {loadContact, findContact};