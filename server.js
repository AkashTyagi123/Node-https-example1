const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req,res)=>{
   console.log("Request for "+ req.url + " by method "+req.method);
   if(req.method == 'GET'){
       let fileUrl;
       if(req.url == '/'){
            fileUrl = '/index.html';
            
       }
        else
            fileUrl = req.url;

        let filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath,(exists)=>{
               if(!exists){
                res.statusCode = 404;
                res.setHeader('content-type','text-html');
                res.end('<html><body><h1>Error 404</h1></body></html>');
                return;
               }
               
               res.statusCode = 200;
               res.setHeader('content-type','text-html');
               fs.createReadStream(filePath).pipe(res);
               res.end('<html><body><h1></h1></body></html>');
              
            });
        }
        else{
        res.statusCode = 404;
        res.setHeader('content-type','text-html');
        res.end('<html><body><h1>Error 404</h1></body></html>');
        return;
        }
   
    }
    else{
        res.statusCode = 404;
        res.setHeader('content-type','text-html');
        res.end('<html><body><h1>Error 404</h1></body></html>');
        return; 
    }

});

server.listen(port,hostname,()=>{
    console.log(`Servr running st http://${hostname}`);
});
