const fs = require('fs');
const path = require('path');

function createBundle() {
    fs.readdir(path.join(__dirname, 'styles'), (err, cont) => {
        if (err) throw err;
        cont.forEach(item => {
            const ext = path.parse(item).ext
            if (ext == '.css') {
                fs.readFile(path.join(__dirname, 'styles', item), 'utf-8', (err, data) => {
                    if (err) throw err;
                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, () => { })
                });
            }
        })
    })
}

fs.readFile(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8', (err, data) => {
    if (data) {
        fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), () => { })
        createBundle()
    } else createBundle()

})





