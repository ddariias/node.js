const http = require('node:http');
const path = require('node:path');
const fsPromises = require('node:fs/promises');


const proxy = async () => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            data: 'Hello World!',
        }));
    });
    server.listen(3000);


    await fsPromises.mkdir(path.join(__dirname, 'baseFolder'), {recursive: true})
    const pathDirectory = path.join(__dirname, 'baseFolder')


    for (let i = 1; i <= 5; i++) {
        await fsPromises.mkdir(path.join(pathDirectory, `new folder${i}`), {recursive: true})

        const pathFile = path.join(pathDirectory, `new folder${i}`)

        console.log(`${pathFile}`)
        const stat = await fsPromises.stat(`${pathFile}`)
        console.log(stat.isDirectory());
        console.log(stat.isFile());

        for (let p = 1; p <= 5; p++) {
            const file = path.join(pathFile, `test${p}.txt`)
            await fsPromises.writeFile(file, 'Hello!')

            console.log(`${file}`)
            const statFile = await  fsPromises.stat(`${file}`)
            console.log(statFile.isDirectory());
            console.log(statFile.isFile());
        }
    }
    console.log(__dirname);
    console.log(pathDirectory)

}
void proxy();

