
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

const port = 3000;

// 跨域请求处理
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//公开静态文件夹
app.use(express.static('public'));
app.use(router);

router.post('/saveblog', (req, res, next) => {
    const { text, title } = req.body;
    const filename = `${Date.now() + "-" + title}.txt`;
    const filepath = 'public/' + filename;
    fs.writeFile(filepath, text, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.send('Saved to ' + filepath);
        }
    });
});

const readFilesFromDir = (title="") => {
    const dirPath = 'public'
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const txtFiles = files.filter((file) => {
                return file.endsWith('.txt');
            });
            filesArr = txtFiles.filter(t=>t.includes(title));
            const promises = filesArr.map((filename) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(`${dirPath}/${filename}`, 'utf-8', (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const newStr = filename.replace('.txt', "");
                        const info = newStr.split('-');
                        resolve({ text: data, title: info[1], date: info[0] });
                    });
                });
            });
            Promise.all(promises)
                .then((results) => {
                    resolve(results);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};

router.get('/doc', async (req, res, next) => {
    const {title} = req.query;
    const arr = await readFilesFromDir(title);
    res.send({ arr })

});
const readFileName = () => {
    const dirPath = 'public';
    return new Promise((reslove, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const txtFiles = files.filter((file) => {
                return file.endsWith('.txt');
            });
            const names = txtFiles.map(filename => {
                const newStr = filename.replace('.txt', "");
                const info = newStr.split('-');
                return info[1]
            });
            reslove(names);
        })
    })
}
router.get('/title', async (req, res, next) => {
    const { key } = req.query;
    const titleArr = await readFileName();
    const data = titleArr.filter(t=>t.includes(key));
    res.send({data});
});



// 监听5000端口 启动服务
app.listen('5000', () => {
    console.log('Server is running 5000');
});

