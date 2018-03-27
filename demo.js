const mfs = require('./memoryFileSystem');

// Create a new and empty drive
const drive = new mfs();

drive.saveFile('./first/second', 'abc.txt', 'Gonen Dukas');
drive.saveFile('.', 'def.txt', 'Gonen Dukas');
drive.saveFile('./first/second', 'abc.txt', 'Changed Text');

console.log('list:');
drive.list('.');
console.log('\n');

console.log('get abc.txt:');
console.log(drive.getFile('./first/second', 'abc.txt'));
console.log('\n');

console.log('get def.txt:');
console.log(drive.getFile('.', 'def.txt'));
console.log('\n');

drive.deleteFile('./first/second/abc.txt');
drive.deleteFile('./def.txt');
console.log('list:');
drive.list('.');
