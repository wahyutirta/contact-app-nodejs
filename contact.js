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

const loadContact = (nama, email, noHp) => {

    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
        fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
    }
    if (!fs.existsSync('./data/contacts.json')) {
        fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
    }

    const file = fs.readFileSync('data/contacts.json', 'utf8');
    //rubah apapun isi file dalam bentuk json
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHp) => {

    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
        fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
    }
    if (!fs.existsSync('./data/contacts.json')) {
        fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
    }

    const contact = { nama, noHp, email };
    // const file = fs.readFileSync('data/contacts.json', 'utf8');
    // //rubah apapun isi file dalam bentuk json
    // const contacts = JSON.parse(file);
    const contacts = loadContact();

    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('kontak sudah terdaftar'));
        return false;
    }
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('input email bukan email valid'));
            return false;
        }
    }
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse.bold('input no hand phone bukan no hand phone valid'));
        return false;
    }
    //gabungkan data baru
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold(`Terimakasih ${nama}, sudah menginputkan data nomor HP ${noHp}, dan email ${email}`));

    //rl.close();
}

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.blue.inverse.bold('Daftar Kontak'));

    contacts.forEach((contact, i) => {

        console.log(`No. ${i + 1} ${contact.nama} ${contact.noHp ? contact.noHp : ''} ${contact.email ? contact.email : ''}`);
        //console.log(`No ${i+1} ${contact.nama}, ${contact.noHp}, ${contact.email}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }
    console.log(chalk.cyan.inverse.bold(`contact.nama`));
    console.log(chalk.cyan.inverse.bold(`contact.noHp`));
    console.log(chalk.cyan.inverse.bold(`${contact.email || contact.email == '' ? contact.email : ''}`));


}

const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`Terimakasih ${nama}, sudah dihapus`));


};

module.exports = { listContact, simpanContact, detailContact, deleteContact };

// using call back, but it is callback loop hell 
// rl.question('Masukan nama anda :', (nama) => {
//     //call back
//     rl.question('Masukan no HP anda: ', (noHp)=> {
//         //callback
//         const contact ={nama, noHp};
//         const file = fs.readFileSync('data/contacts.json', 'utf8');
//         //rubah apapun isi file dalam bentuk json
//         const contacts = JSON.parse(file);
//         //gabungkan data baru
//         contacts.push(contact);
//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//         console.log(`Terimakasih ${nama}, sudah menginputkan data nomor HP ${noHp}`);
//         rl.close();
//     });
// });
