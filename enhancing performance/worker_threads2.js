const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const numCPUs = require('os').cpus().length;

if(isMainThread) {
    const workers = []

    for(let i = 0; i < numCPUs; i++) {
       const worker = new Worker(__filename, {
        workerData: {workerId: i}
       })

       worker.on('message', message => {
        console.log(`从 Worker ${message.workerId} 接收到:`, message.data);
       })

       worker.on('error', (error) => {
        console.error('Worker 错误:', error);
    });

       worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker 退出代码: ${code}`);
            }
        });

        workers.push(worker);
    }
}else{
    // Work 线程 
    console.log(`Worker ${workerData.workerId} started`);
    parentPort.postMessage({workerId: workerData.workerId,  data: `Hello from Worker! ${workerData.workerId}`})
}