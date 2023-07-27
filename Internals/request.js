const https = require('https');

const start = Date.now();
const url = 'https://www.baidu.com/';

function doRequest(){
    const req = https.request(url, res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('end', Date.now() - start); // end 60
        });
    });
    
    req.on('error', error => {
        console.error('请求错误:', error);
    });
    
    req.end();
}



doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()

// end 53
// end 55
// end 56
// end 56
// end 56
// end 57