'use strict'

const tape = require('tape')
const gemeindeverzeichnis = require('./index')
const isStream = require('isstream')
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

tape('gemeindeverzeichnis', (t) => {
	t.plan(7)

	t.ok(isStream(gemeindeverzeichnis()), 'returns stream')

	gemeindeverzeichnis()
	.on('error', t.fail)
	.on('data', (item) => {
		if(isLandNRW(item)) t.pass('contains land `NRW`')
		else if(isRegierungsbezirkMuenster(item)) t.pass('contains regierungsbezirk `Münster`')
		else if(isRegionStuttgart(item)) t.pass('contains region `Stuttgart`')
		else if(isKreisGelsenkirchen(item)) t.pass('contains kreis `Gelsenkirchen`')
		else if(isGemeindeverbandMarl(item)) t.pass('contains gemeindeverband `Marl`')
		else if(isGemeindePrezelle(item)) t.pass('contains gemeinde `Prezelle`')
	})
})