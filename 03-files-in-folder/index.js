const fs = require('fs');
const path = require('path');

const pathTo = path.join(__dirname, 'secret-folder')

fs.readdir(pathTo, (err, files) => {
    if (err) throw err
    files.forEach(item => {
        fs.stat(path.join(pathTo, item), (err, stats) => {
            if (err) throw err
            if (stats.isFile()) {
                const size = stats.size / 1024;
                console.log(`${path.parse(item).name} - ${path.parse(item).ext.substring(1)} - ${size.toFixed(2)} kb`)
            }
        })
    })
})