'use strict'

const moment = require('moment-timezone')

const substr = (string, start, length) => string.substr(start, length).trim()

const ebenen = {
	1: 'land',
	2: 'regierungsbezirk',
	3: 'region',
	4: 'kreis',
	5: 'gemeindeverband',
	6: 'gemeinde'
}
const kreisTypen = {
	41: 'kreisfreie-stadt',
	42: 'stadtkreis',
	43: 'kreis',
	44: 'landkreis',
	45: 'regionalverband'
}
const gemeindeverbandsTypen = {
	50: 'verbandsfreie-gemeinde',
	51: 'amt',
	52: 'samtgemeinde',
	53: 'verbandsgemeinde',
	54: 'verwaltungsgemeinschaft',
	55: 'kirchspielslandgemeinde',
	56: 'verwaltungsverband',
	57: 'vg-trägermodell',
	58: 'erfüllende-gemeinde'
}
const gemeindeTypen = {
	60: 'markt',
	61: 'kreisfreie-stadt',
	62: 'stadtkreis',
	63: 'stadt',
	64: 'kreisangehörige-gemeinde',
	65: 'gemeindefreies-gebiet-bewohnt',
	66: 'gemeindefreies-gebiet-unbewohnt',
	67: 'große-kreisstadt'
}

const parseEbene = (l) => ({
	nummer: +substr(l, 0, 2)/10,
	name: ebenen[+substr(l, 0, 2)/10]
})
const parseDatum = (l) => {
	const jahr = substr(l, 2, 4)
	const monat = substr(l, 6, 2)
	const tag = substr(l, 8, 2)
	return moment.tz(`${tag}.${monat}.${jahr}`, 'DD.MM.YYYY', 'Europe/Berlin').toDate()
}
const parseName = (l) => substr(l, 22, 50)
const parseLand = (l) => substr(l, 10, 2)
const parseRegierungsbezirk = (l) => substr(l, 12, 1)
const parseKreisRegion = (l) => substr(l, 13, 2)
const parseGemeindeverband = (l) => substr(l, 18, 4)
const parseGemeinde = (l) => substr(l, 15, 3)
const parseSitz = (l) => substr(l, 72, 50)
const parseTyp = (l) => +substr(l, 122, 2)

// Land
const parseType10 = (l) => ({
	'schlüssel': {
		nummer: parseLand(l),
		land: parseLand(l)
	},
	sitz: parseSitz(l)
})

// Regierungsbezirk
const parseType20 = (l) => ({
	'schlüssel': {
		nummer: parseLand(l)+parseRegierungsbezirk(l),
		land: parseLand(l),
		regierungsbezirk: parseRegierungsbezirk(l)
	},
	sitz: parseSitz(l)
})

// Region
const parseType30 = (l) => ({
	'schlüssel': {
		nummer: parseLand(l)+parseRegierungsbezirk(l)+'-'+parseKreisRegion(l), // inofficial id
		land: parseLand(l),
		regierungsbezirk: parseRegierungsbezirk(l),
		region: parseKreisRegion(l)
	},
	sitz: parseSitz(l)
})

// Kreis
const parseType40 = (l) => ({
	'schlüssel': {
		nummer: parseLand(l)+parseRegierungsbezirk(l)+parseKreisRegion(l),
		land: parseLand(l),
		regierungsbezirk: parseRegierungsbezirk(l),
		kreis: parseKreisRegion(l)
	},
	sitz: parseSitz(l),
	typ: {
		nummer: parseTyp(l),
		name: kreisTypen[parseTyp(l)]
	}
})

// Gemeindeverband
const parseType50 = (l) => ({
	'schlüssel': {
		nummer: parseLand(l)+parseRegierungsbezirk(l)+parseKreisRegion(l)+parseGemeindeverband(l),
		land: parseLand(l),
		regierungsbezirk: parseRegierungsbezirk(l),
		kreis: parseKreisRegion(l),
		gemeindeverband: parseGemeindeverband(l)
	},
	sitz: parseSitz(l),
	typ: {
		nummer: parseTyp(l),
		name: gemeindeverbandsTypen[parseTyp(l)]
	}
})

// Gemeinde
const parseType60 = (l) => ({
	'schlüssel': {
		nummer: parseLand(l)+parseRegierungsbezirk(l)+parseKreisRegion(l)+parseGemeindeverband(l)+parseGemeinde(l),
		land: parseLand(l),
		regierungsbezirk: parseRegierungsbezirk(l),
		kreis: parseKreisRegion(l),
		gemeindeverband: parseGemeindeverband(l),
		gemeinde: parseGemeinde(l)
	},
	typ: {
		nummer: parseTyp(l),
		name: gemeindeTypen[parseTyp(l)]
	},
	'fläche': +substr(l, 128, 11),
	'bevölkerung': +substr(l, 139, 11),
	'bevölkerung-männlich': +substr(l, 150, 11),
	plz: {
		nummer: substr(l, 165, 5),
		eindeutig: !substr(l, 170, 5)
	},
	gerichtsbarkeit: {
		oberlandesgerichtsbezirk: substr(l, 181, 1),
		landsgerichtsbezirk: substr(l, 182, 1), // ???
		amtsgerichtsbezirk: substr(l, 183, 2)
	},
	finanzamtsbezirk: substr(l, 177, 4),
	arbeitsagenturbezirk: substr(l, 185, 5),
	bundestagswahlkreise: {
		von: +substr(l, 190, 3),
		bis: +substr(l, 193, 3) || +substr(l, 190, 3)
	}
})

const parseAllTypes = (l) => ({
	ebene: parseEbene(l),
	name: parseName(l),
	stand: parseDatum(l),
	weiteres: substr(l, 200, 20) // landesinterne Angaben
})

const parse = (line, type) => {
	const general = parseAllTypes(line)
	if(type===10) return Object.assign(general, parseType10(line))
	if(type===20) return Object.assign(general, parseType20(line))
	if(type===30) return Object.assign(general, parseType30(line))
	if(type===40) return Object.assign(general, parseType40(line))
	if(type===50) return Object.assign(general, parseType50(line))
	if(type===60) return Object.assign(general, parseType60(line))
	throw new Error(`unsupported line type ('Satzart'): ${type}`)
}

module.exports = parse