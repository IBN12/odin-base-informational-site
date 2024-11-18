const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs'); 

// Will first look for the environment variable, and
// if thats not found then it will run it on port 8080:
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    // Building a file path: 
    let filePath = "";
    if (req.url === "/")
    {
        filePath = path.join(__dirname, "project", "index.html"); 
    }
    else if (req.url === "/about")
    {
        filePath = path.join(__dirname, "project", "about.html");
    }
    else if (req.url === "/contact-me")
    {
        filePath = path.join(__dirname, "project", "contact-me.html"); 
    }

    // Extension name:
    let extName = path.extname(filePath); 

    // Initial content type:
    let contentType = 'text/html';

    // Check the extension name and set the content type:
    switch(extName)
    {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.text':
            contentType = 'text/plain'; 
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err)
        {
            if (err.code === 'ENOENT')
            {
                // Page not found:
                fs.readFile(path.join(__dirname, 'project', '404.html'), (err, content) =>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8'); 
                });
            }
            else
            {
                // Server error: 
                res.writeHead(500); 
                res.end(`Server Error ${err.code}`); 
            }
        }
        else 
        {
            
            // Success:
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));