const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // You can choose any available port

const server = http.createServer((req, res) => {
    // Set the content type based on the file extension
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
    };

    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);

    // Check if the requested file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        // Set the content type header
        res.setHeader('Content-Type', contentType[extname] || 'text/plain');

        // Read and serve the file
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});