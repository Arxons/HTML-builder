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


fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    if (err) throw err;
    fs.appendFile(path.join(projectDist, 'index.html'), data, () => { })
})
fs.readdir(path.join(__dirname, 'components'), (err, cont) => {
    if (err) throw err;
    let res = [];
    cont.forEach(item => {
        const ext = path.parse(item).ext
        if (ext == '.html') {
            fs.readFile(path.join(__dirname, 'components', item), 'utf-8', (err, data) => {
                if (err) throw err;
                const htmlToReplace = data;
                fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
                    const fileName = path.parse(item).name
                    const regexp = /{{(.*)}}/g

                    data = data.split(regexp)
                    for (let i = 0; i < data.length; i++) {
                        if (data[i] == fileName) {
                            data[i] = htmlToReplace
                        }
                    }
                    data = data.join('')
                    fs.appendFile(path.join(projectDist, 'index.html'), data, () => { })

                    //     if (fileName == 'header') {
                    //         data = data.replace('{{header}}', htmlToReplace)
                    //     } else if (fileName == 'footer') {
                    //         data = data.replace('{{footer}}', htmlToReplace)
                    //     } else if (fileName == 'articles') data = data.replace('{{articles}}', htmlToReplace)
                    // })

                });
            }
            )
        }
    })
    setTimeout(() => {
        const regexp = /{{(.*)}}/g
        res = res
            .join('')
            .split(regexp)
        const jopa = new Set(res)
        console.log(jopa)
    }, 100)
})
