const https = require('https');

const start = Date.now();
const urls = [
    'https://www.baidu.com/',
    // 'https://www.google.com/',
    'https://www.microsoft.com/',
    // 添加更多不同的域名
  ];
  
  function doRequest(url) {
    const req = https.request(url, res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(`${url} 请求完成，耗时：`, Date.now() - start, 'ms');
      });
    });
  
    req.on('error', error => {
      console.error('请求错误:', error);
    });
  
    req.end();
  }
  
  urls.forEach(doRequest);
  