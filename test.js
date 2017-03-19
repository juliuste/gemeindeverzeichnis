'use strict'

const tape = require('tape')
const gemeindeverzeichnis = require('.')
const isStream = require('is-stream')
const map = require('through2-map').obj

const isLandNRW = (i) => (
	(i['schlüssel'].nummer === '05')
 && (i.ebene.nummer === 1)
 && (i.ebene.name === 'land')
 && (i.name = 'Nordrhein-Westfalen')
)

const isRegierungsbezirkMuenster = (i) => (
	(i['schlüssel'].nummer === '055')
 && (i.ebene.nummer === 2)
 && (i.ebene.name === 'regierungsbezirk')
 && (i.name === 'Reg.-Bez. Münster')
)

const isRegionStuttgart = (i) => (
	(i['schlüssel'].nummer === '081-1')
 && (i.ebene.nummer === 3)
 && (i.ebene.name === 'region')
 && (i.name === 'Region Stuttgart')
)

const isKreisGelsenkirchen = (i) => (
	(i['schlüssel'].nummer === '05513')
 && (i.ebene.nummer === 4)
 && (i.ebene.name === 'kreis')
 && (i.name === 'Gelsenkirchen, Stadt')
)

const isGemeindeverbandMarl = (i) => (
	(i['schlüssel'].nummer === '055620024')
 && (i.ebene.nummer === 5)
 && (i.ebene.name === 'gemeindeverband')
 && (i.name === 'Marl, Stadt')
)

const isGemeindePrezelle = (i) => (
	(i['schlüssel'].nummer === '033545403020')
 && (i.ebene.nummer === 6)
 && (i.ebene.name === 'gemeinde')
 && (i.name === 'Prezelle')
)

tape('laender()', (t) => {
	t.plan(2)
	const s = gemeindeverzeichnis.laender()

	t.ok(isStream.readable(s), 'returns stream')
	s
	.on('error', t.fail)
	.on('data', (item) => {
		if(isLandNRW(item)) t.pass('contains land `NRW`')
		// todo: check if every item is valid
	})
})

tape('regierungsbezirke()', (t) => {
	t.plan(2)
	const s = gemeindeverzeichnis.regierungsbezirke()

	t.ok(isStream.readable(s), 'returns stream')
	s
	.on('error', t.fail)
	.on('data', (item) => {
		if(isRegierungsbezirkMuenster(item)) t.pass('contains `Münster`')
		// todo: check if every item is valid
	})
})

tape('regionen()', (t) => {
	t.plan(2)
	const s = gemeindeverzeichnis.regionen()

	t.ok(isStream.readable(s), 'returns stream')
	s
	.on('error', t.fail)
	.on('data', (item) => {
		if(isRegionStuttgart(item)) t.pass('contains `Stuttgart`')
		// todo: check if every item is valid
	})
})

tape('kreise()', (t) => {
	t.plan(2)
	const s = gemeindeverzeichnis.kreise()

	t.ok(isStream.readable(s), 'returns stream')
	s
	.on('error', t.fail)
	.on('data', (item) => {
		if(isKreisGelsenkirchen(item)) t.pass('contains `Gelsenkirchen`')
		// todo: check if every item is valid
	})
})

tape('gemeindeverbaende()', (t) => {
	t.plan(2)
	const s = gemeindeverzeichnis.gemeindeverbaende()

	t.ok(isStream.readable(s), 'returns stream')
	s
	.on('error', t.fail)
	.on('data', (item) => {
		if(isGemeindeverbandMarl(item)) t.pass('contains `Marl`')
		// todo: check if every item is valid
	})
})

tape('gemeinden()', (t) => {
	t.plan(2)
	const s = gemeindeverzeichnis.gemeinden()

	t.ok(isStream.readable(s), 'returns stream')
	s
	.on('error', t.fail)
	.on('data', (item) => {
		if(isGemeindePrezelle(item)) t.pass('contains `Prezelle`')
		// todo: check if every item is valid
	})
})
