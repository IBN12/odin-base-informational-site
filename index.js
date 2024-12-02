const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs'); 

const express = require('express');
const index = express(); 

index.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project', 'index.html')); 
}); 

index.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'project', 'about.html')); 
}); 

index.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'project', 'contact-me.html')); 
});

index.get('/:id', (req, res) => {
    if (req.params.id !== '/' || req.params.id !== 'about' || req.params.id !== 'contact')
    {
        res.sendFile(path.join(__dirname, 'project', '404.html'));
    }
}); 

const PORT = process.env.PORT || 3000;
index.listen(PORT, () => {
    console.log(`Testing out express with this project on PORT ${PORT}`); 
});

