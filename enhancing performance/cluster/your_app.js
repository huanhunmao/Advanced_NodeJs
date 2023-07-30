const cluster = require('cluster');

if(cluster.isMaster){
    const numCpus = require('os').cpus().length

    for(let i = 0; i < numCpus; i ++){
        cluster.fork() // 创建子进程
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // 在此处可以选择重新启动一个新的子进程
    })
}else{
    // 子进程代码
    const https = require('https')
    const server  = https.createServer((req, res) => {
        res.end('Hello')
    })

    server.listen(3000, () => {
        console.log(`Server is running on port 3000, process ID: ${process.pid}`);})
}