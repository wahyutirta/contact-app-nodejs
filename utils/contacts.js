const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const screening = () => {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
        fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
    }
    if (!fs.existsSync('./data/contacts.json')) {
        fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
    }
};


const pertanyaan = (Question) => {
    return new Promise((resolve, reject) => {
        rl.question(Question, (answear) => {
            resolve(answear);
        });
    });
};

const loadContact = (nama, noHp, email) => {
    screening();

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

const saveContact = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const addContact = (contact) => {


    const contacts = loadContact();

    //gabungkan data baru
    contacts.push(contact);
    saveContact(contacts)


    //rl.close();
}

const isDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    
    saveContact(newContacts);
    console.log(chalk.green.inverse.bold(`Terimakasih ${nama}, sudah dihapus`));
};

const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama === contactBaru.oldnama);
    
    
    delete contactBaru.oldnama;

    

    filteredContacts.push(contactBaru);
    saveContact(filteredContacts);
};

module.exports = { loadContact, findContact, addContact, isDuplikat, deleteContact, updateContacts };