const express = require('express');
const app = module.exports = express();

app.use(express.static(__dirname+'/public'));
