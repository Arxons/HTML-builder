const fs = require('fs');
const path = require('path');

const pathTo = path.join(__dirname, 'text.txt')
const text = fs.ReadStream(pathTo, 'utf-8');

text.on('readable', () => {
    const data = text.read()
    if (data) console.log(data)
});