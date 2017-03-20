'use strict'

const fs = require('fs')
const path = require('path')
const ndjson = require('ndjson')
const combine = require('multistream')

const src = (file) => () =>
	fs.createReadStream(path.join(__dirname, file))
	.pipe(ndjson.parse())

const srcs = {
	laender: src('laender.ndjson'),
	regierungsbezirke: src('regierungsbezirke.ndjson'),
	regionen: src('regionen.ndjson'),
	kreise: src('kreise.ndjson'),
	gemeindeverbaende: src('gemeindeverbaende.ndjson'),
	gemeinden: src('gemeinden.ndjson')
}

const all = () =>
	combine.obj(Object.keys(srcs).map((key) => {
		const src = srcs[key]
		return src()
	}))

module.exports = Object.assign(all, srcs)
