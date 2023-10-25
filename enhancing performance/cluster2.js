const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('你好世界\n');
    }).listen(8000);

    console.log(`工作进程 ${process.pid} 已启动`);
}


// result
// 主进程 28765 正在运行
// 工作进程 28766 已启动
// 工作进程 28767 已启动
// 工作进程 28768 已启动
// 工作进程 28771 已启动
// 工作进程 28770 已启动
// 工作进程 28769 已启动
// 工作进程 28772 已启动
// 工作进程 28773 已启动
// 工作进程 28774 已启动
// 工作进程 28775 已启动
// 工作进程 28776 已启动
// 工作进程 28777 已启动
// 工作进程 28777 已退出
// 工作进程 28776 已退出