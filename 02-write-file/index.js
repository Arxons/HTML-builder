const readline = require('readline');
const path = require('path');
const fs = require('fs');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const pathTo = path.join(__dirname, 'userText.txt');

fs.writeFile(pathTo, '', (err) => {
    if (err) throw err
    console.log('write some text:')
    rl.on('line', (answer) => {
        if (answer === 'exit') {
            console.log('goodbye dear:)')
            rl.close()
        } else {
            fs.appendFile(pathTo, `\n${answer}`, (err) => {
                if (err) throw err
            })
        }
    });

    rl.on('SIGINT', () => {
        console.log('goodbye dear:)')
        rl.close()
    })
})

