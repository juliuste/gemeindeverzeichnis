#!/usr/bin/env node
'use strict'

const got = require('got')
const fs = require('fs')
const path = require('path')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

got('https://www.govdata.de/ckan/api/rest/dataset/gv100_quartalsausgabe', {json: true})
.then((res) => new Promise((resolve, reject) => {
	const src = res.body.download_url
	const dest = path.join(__dirname, 'data.zip')

	got.stream(src).once('error', reject)
	.pipe(fs.createWriteStream(dest)).once('error', reject)
	.once('finish', () => resolve())
}))
.catch(showError)
