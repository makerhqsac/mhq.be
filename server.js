'use strict';

const express = require('express');

const app = express();

const system = require('./handlers/system');
const redirect = require('./handlers/redirect');
const adm = require('./handlers/adm');

app.get('/adm', adm.get());
app.post('/adm', adm.post());
app.get('/adm/:slug', adm.slug());

app.get('/:slug', redirect());

module.exports = app;
