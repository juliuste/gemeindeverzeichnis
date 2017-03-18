'use strict'

const fs = require('fs')
const byLine = require('byline')
const Iconv = require('iconv').Iconv
const map = require('through2-map').obj
const ndjson = require('ndjson')
const path = require('path')

const parseType = require('./parseType')

const converter = new Iconv('ISO-8859-1', 'utf-8')

const parseLine = (line) => {
	const type = +(line.toString().substr(0, 2))
	return parseType(line.toString(), type)
}

const parse = (file) => {
	return fs.createReadStream(file)
	.pipe(converter)
	.pipe(byLine.createStream())
	.pipe(map(parseLine))
	.pipe(ndjson.stringify())
	.pipe(process.stdout)
}

parse(path.join(__dirname, './data/GV100AD_310317.ASC'))
