const cluster = require('cluster')
process.env.UV_THREADPOOL_SIZE = 1
// console.log(cluster.isMaster); // true

if(cluster.isMaster) {

    cluster.fork()
    // cluster.fork() // 多个 children
    // cluster.fork()
}else{
    const crypto = require('crypto')
    const express = require('express')
    const app = express()

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        });
    });

app.get('/fast', (req, res) => {
    res.send('It is very fast!')
})

app.listen(3000)
}