const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist')

fs.mkdir(projectDist, () => { })

function createStyle() {
    fs.readdir(path.join(__dirname, 'styles'), (err, cont) => {
        if (err) throw err;
        cont.forEach(item => {
            const ext = path.parse(item).ext
            if (ext == '.css') {
                fs.readFile(path.join(__dirname, 'styles', item), 'utf-8', (err, data) => {
                    if (err) throw err;
                    fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, () => { })
                });
            }
        })
    })
}

fs.readFile(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8', (err, data) => {
    if (data) {
        fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), () => { })
        createStyle()
    } else createStyle()

})

fs.readdir(path.join(__dirname, 'components'), (err, cont) => {
    if (err) throw err;
    let res = [];
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
        if (err) throw err;
        fs.writeFile(path.join(projectDist, 'index.html'), data, () => { })
        const regexp = /{{(.*)}}/g
        data = data
            .split(regexp)
            .forEach(item => {
                res.push(item)
            })
    });
    setTimeout(() => {
        cont.forEach(item => {
            const ext = path.parse(item).ext
            const fileName = path.parse(item).name
            if (ext == '.html') {
                fs.readFile(path.join(__dirname, 'components', item), 'utf-8', (err, data) => {
                    if (err) throw err;
                    const htmlToReplace = data;
                    res.forEach((curitem, index) => {
                        if (curitem == fileName) {
                            res.splice(index, 1, htmlToReplace)
                            fs.writeFile(path.join(projectDist, 'index.html'), res.join(''), () => { })

                        }
                    })
                })
            }
        })

    }, 100);
})


//Внимание, копирование ассетов работает только с 1 уровнем вложенности, не успел доделать рекурсию
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => { })
fs.readdir(path.join(__dirname, 'assets'), (err, cont) => {
    if (err) throw err
    cont.forEach(item => {
        fs.stat(path.join(__dirname, 'assets', item), (err, stats) => {
            if (stats.isFile()) {
                fs.copyFile(path.join(__dirname, 'assets', item), path.join(__dirname, 'project-dist', 'assets', item), () => { })
            } else {
                fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item), () => { })
                fs.readdir(path.join(__dirname, 'assets', item), (err, c) => {
                    if (err) throw err
                    c.forEach(i => {

                        fs.copyFile(path.join(__dirname, 'assets', item, i), path.join(__dirname, 'project-dist', 'assets', item, i), () => { })
                    })
                })
            }

        })
    })
})
//Если вдруг у вас какой то модуль не работает, пожалуйста напишите в ЛС перед оцениванием.
//тестировал по-разному, но возможно мог упустить что то.