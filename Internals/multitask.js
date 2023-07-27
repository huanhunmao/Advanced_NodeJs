const https = require('https');
// process.env.UV_THREADPOOL_SIZE = 13
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();
const url = 'https://www.microsoft.com/';

function doRequest(){
    const req = https.request(url, res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('doRequest end', Date.now() - start); // end 60
        });
    });
    
    req.on('error', error => {
        console.error('请求错误:', error);
    });
    
    req.end();
}

const password = 'your_password';
const salt = 'random_salt'; // 随机生成的盐值，每个用户应该有不同的盐
const iterations = 100000; // 迭代次数，增加迭代次数可以增强哈希安全性但会增加计算时间
const keyLength = 512; // 输出密钥的长度
const digest = 'sha512'; // 使用的散列算法，可以是 sha256、sha512 等

function doHash(){
    crypto.pbkdf2(password, salt,iterations, keyLength, digest, (err, directKey) => {
        if(err) throw err 
        // console.log('生成密钥为：',directKey.toString('hex'));
        console.log('pbkdf2 pass time000', Date.now() - start  ); // 420ms 非常🎉
        // 生成密钥为： 29fecb9697155476760d0e030fcf98459e72a594d56392fd45a6618e59d9e6839dd66468e57a658ce30b64e75c4e0e18051f1a95a6e4724fdeb7e030ed305c9a
    })
}

doRequest()

fs.readFile("multitask.js", "utf8", () => {
    console.log('multitask read file time', Date.now() - start  );
})

doHash()
doHash()
doHash()
doHash()