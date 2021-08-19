const yargs = require('yargs');
const contact = require('./contact');
//console.log(yargs.argv);
//yargs.command('add', 'Menambah Contact baru', () => {}, (argv) => {console.log(argv.nama)});

yargs.command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        nohp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function(argv){
        
        contact.simpanContact(argv.nama,argv.email,argv.nohp);
    },
}).demandCommand();

// menampilkan daftar semua nama contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua data kontak',
    handler (){
        contact.listContact();
    }
});

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler (argv){
        contact.detailContact(argv.nama);
    },
});

yargs.command({
    command: 'delete',
    describe: 'Menghapus kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler (argv){
        contact.deleteContact(argv.nama);
    },
});

yargs.parse();
