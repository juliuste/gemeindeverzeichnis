'use strict'

const fs = require('fs')
const ndjson = require('ndjson')

const gemeindeverzeichnis = () => 
	fs.createReadStream('data.json')
	.pipe(ndjson.parse())

module.exports = gemeindeverzeichnis