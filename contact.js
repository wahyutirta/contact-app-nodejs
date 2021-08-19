const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// try{
//     fs.writeFileSync('data/text.txt', 'Write Hellow World Synchronous');

// } catch (e){
//     console.log(e);
// }

// fs.writeFile('data/text.txt', 'Write Hello World ASynchronous', (err)=> {
//     console.log(err);
// });

// const data = fs.readFileSync('data/text.txt', 'utf-8');
// console.log(data);

// const dataAsyn = fs.readFile('data/text.txt', 'utf-8', (err, dataAsyn) =>{
//     if (err) throw err;
//     console.log(dataAsyn);
// });

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

const simpanContact = (nama, email, noHp) => {
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
    if (email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('input email bukan email valid'));
        return false;
        }
    }
    if(!validator.isMobilePhone(noHp, 'id-ID')){
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
    
        console.log(`No. ${i+1} ${ contact.nama ? contact.nama : ''} ${contact.noHp ? contact.noHp : ''} ${contact.email ? contact.email : ''}`);
        //console.log(`No ${i+1} ${contact.nama}, ${contact.noHp}, ${contact.email}`);
    });
}

module.exports = { listContact, simpanContact };

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
