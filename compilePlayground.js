'use strict';

const fs = require('fs');
const path = require('path');
let ejs = require('ejs');

//console.log("Current path is :" + process.cwd())
let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);
//console.log(config);

// Creating out dir if not exists
let publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Compiling index file 
ejs.renderFile(path.join(process.cwd(), 'templates', 'partials', 'index.ejs'), {pages: config.pages, path: path }, null, function(err, str){
    if (err) {
        console.error(err)
    } else {
        fs.writeFileSync(path.join(publicDir, 'index.html'), str)
    }
});

// Compiling other pages

config.pages.forEach( page => 
    ejs.renderFile(path.join(process.cwd(), 'templates', 'partials', 'page.ejs'), {page: page, path: path }, null, function(err, str){
        if (err) {
            console.error(err)
        } else {
            fs.writeFileSync(path.join(publicDir, page.name + '.html'), str)
        }
    })
);
