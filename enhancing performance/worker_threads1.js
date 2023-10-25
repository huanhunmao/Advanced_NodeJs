const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread) {
// 主线程
const worker = new Worker(__filename, {
    workerData: { value: '传递给 Worker 的数据' }
});

worker.on('message', (message) => {
    console.log('从 Worker 接收到:', message);
});

worker.on('error', (error) => {
    console.error('Worker 错误:', error);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Worker 退出代码: ${code}`);
    }
});
}else{
       // Worker 线程
       console.log('Worker 数据', workerData);
       parentPort.postMessage('从 Worker 发送的数据')
}