'use strict'

const fs = require('fs')
const path = require('path')
const ndjson = require('ndjson')

const src = (file) => () =>
	fs.createReadStream(path.join(__dirname, file))
	.pipe(ndjson.parse())

module.exports = {
	laender: src('laender.ndjson'),
	regierungsbezirke: src('regierungsbezirke.ndjson'),
	regionen: src('regionen.ndjson'),
	kreise: src('kreise.ndjson'),
	gemeindeverbaende: src('gemeindeverbaende.ndjson'),
	gemeinden: src('gemeinden.ndjson')
}
