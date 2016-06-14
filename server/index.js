#!/usr/bin/env node

const app = require ('./app');

app.listen(process.argv[2] || 9000);
