'use strict'

const fs = require('fs')
const ndjson = require('ndjson')

const gemeindeverzeichnis = () => 
	fs.createReadStream('data.ndjson')
	.pipe(ndjson.parse())

module.exports = gemeindeverzeichnis