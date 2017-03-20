'use strict'

const fs = require('fs')
const byLine = require('byline')
const Iconv = require('iconv').Iconv
const map = require('through2-map').obj
const ndjson = require('ndjson')
const path = require('path')
const through = require('through2')

const parseType = require('./parseType')

const converter = new Iconv('ISO-8859-1', 'utf-8')

const parseLine = (line) => {
	const type = +(line.toString().substr(0, 2))
	return parseType(line.toString(), type)
}

const showError = (err) => {
	if (!err) return
	console.error(err)
	process.exit(1)
}

const src = path.join(__dirname, './data/GV100AD_310317.ASC')

const dest = (file) => {
	const out = ndjson.stringify()
	out.pipe(fs.createWriteStream(path.join(__dirname, '..', file)))
	return out
}

const dests = {
	land: dest('laender.ndjson'),
	regierungsbezirk: dest('regierungsbezirke.ndjson'),
	region: dest('regionen.ndjson'),
	kreis: dest('kreise.ndjson'),
	gemeindeverband: dest('gemeindeverbaende.ndjson'),
	gemeinde: dest('gemeinden.ndjson')
}

fs.createReadStream(src)
.pipe(converter)
.pipe(byLine.createStream())
.pipe(map(parseLine))
.on('end', () => {
	for (let type in dests) dests[type].end()
})
.on('data', (item) => {
	const type = item.ebene.name
	if (!dests[type]) {
		console.error(`unknown type ${type}: ${item.name}`)
		return
	}

	dests[type].write(item)
})
