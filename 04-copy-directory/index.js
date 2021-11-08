const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), () => { })
fs.readdir(path.join(filesPath), (err, cont) => {
    if (err) throw err
    cont.forEach(item => {
        fs.copyFile(path.join(filesPath, item), path.join(__dirname, 'files-copy', item), () => { })
    })
})