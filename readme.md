# gemeindeverzeichnis

German „Gemeindeverzeichnis“ (vaguely "community register") containing all federal entities based on [this dataset](https://www.govdata.de/web/guest/daten/-/details/gv100_quartalsausgabe) fortunately provided by the [„Statistisches Bundesamt“](https://www.destatis.de).

[![npm version](https://img.shields.io/npm/v/gemeindeverzeichnis.svg)](https://www.npmjs.com/package/gemeindeverzeichnis)
[![Build Status](https://travis-ci.org/juliuste/gemeindeverzeichnis.svg?branch=master)](https://travis-ci.org/juliuste/gemeindeverzeichnis)
[![dependency status](https://img.shields.io/david/juliuste/gemeindeverzeichnis.svg)](https://david-dm.org/juliuste/gemeindeverzeichnis)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/gemeindeverzeichnis.svg)](https://david-dm.org/juliuste/gemeindeverzeichnis#info=devDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/gemeindeverzeichnis.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/juliuste/gemeindeverzeichnis.svg?style=flat)](LICENSE)

## Installation

```bash
npm install --save gemeindeverzeichnis
```

## Usage

This module contains the following [ndjson](http://ndjson.org) files:

- `laender.ndjson`: [*Bundesländer*](https://en.wikipedia.org/wiki/States_of_Germany), see [`land`](#land)
- `regierungsbezirke.ndjson`: [*Regierungsbezirke*](https://en.wikipedia.org/wiki/Regierungsbezirk), see [`regierungsbezirk`](#regierungsbezirk)
- `regionen.ndjson`: *Regionen* (regions), see [`region`](#region)
- `kreise.ndjson`: [*Kreise*](https://en.wikipedia.org/wiki/Districts_of_Germany), see [`kreis`](#kreis)
- `gemeindeverbaende.ndjson`: [*Gemeindeverbände*](https://en.wikipedia.org/wiki/Gemeindeverband), see [`gemeindeverband`](#gemeindeverband)
- `gemeinden.ndjson`: [*Gemeinden*](https://en.wikipedia.org/wiki/Municipalities_of_Germany), see [`gemeinde`](#gemeinde)

You can also require the module itself to get [readable streams](https://nodejs.org/api/stream.html#stream_class_stream_readable) in [object mode](https://nodejs.org/api/stream.html#stream_object_mode):

```js
const gemeindeverzeichnis = require('gemeindeverzeichnis')

gemeindeverzeichnis.kreise()
.on('data', console.log)
.on('error', console.error)
```

### `land`

```js
{
	ebene: { // federal layer
		nummer: 1,
		name: 'land'
	},
	name: 'Nordrhein-Westfalen',
	stand: '2017-03-30T22:00:00.000Z', // as of …, [Date() Object]
	weiteres: '', // additional information
	'schlüssel': { // ids
		nummer: '05', // entity id
		land: '05'
	},
	sitz: 'Düsseldorf' // seat of the state government
}
```

### `regierungsbezirk`

```js
{
	ebene: { // federal layer
		nummer: 2,
		name: 'regierungsbezirk'
	},
	name: 'Reg.-Bez. Münster',
	stand: '2017-03-30T22:00:00.000Z', // as of …, [Date() Object]
	weiteres: '', // additional information
	'schlüssel': { // ids
		nummer: '055', // entity id
		land: '05',
		regierungsbezirk: '5'
	},
	sitz: 'Münster' // seat of the administration
}
```

### `region`

```js
{
	ebene:{ // federal layer
		nummer: 3,
		name: 'region'
	},
	name: 'Region Stuttgart',
	stand: '2017-03-30T22:00:00.000Z', // as of …, [Date() Object]
	weiteres: '', // additional information
	'schlüssel': { // ids
		nummer: '081-1', // entity id
	 	land: '08',
	 	regierungsbezirk: '1',
	 	region: '1'
	},
	sitz: 'Stuttgart' // seat of the administration
}
```

### `kreis`

```js
{
	ebene: { // federal layer
		nummer: 4,
		name: 'kreis'
	},
	name: 'Gelsenkirchen, Stadt',
	stand: '2017-03-30T22:00:00.000Z', // as of …, [Date() Object]
	weiteres: '', // additional information
	'schlüssel': { // ids
		nummer: '05513', // entity id
		land: '05',
		regierungsbezirk: '5',
		kreis: '13'
	},
	sitz: 'Gelsenkirchen', // seat of the administration
	typ: { // type
		nummer: 41,
		name: 'kreisfreie-stadt'

		// 41: 'kreisfreie-stadt'
		// 42: 'stadtkreis'
		// 43: 'kreis'
		// 44: 'landkreis'
		// 45: 'regionalverband'
	}
}
```

### `gemeindeverband`

```js
{
	ebene: { // federal layer
		nummer: 5,
		name: 'gemeindeverband'
	},
	name: 'Marl, Stadt',
	stand: '2017-03-30T22:00:00.000Z', // as of …, [Date() Object]
	weiteres: '', // additional information
	'schlüssel': { // ids
		nummer: '055620024', // entity id
		land: '05',
		regierungsbezirk: '5',
		kreis: '62',
		gemeindeverband: '0024'
	},
	sitz: '', // seat of the administration
	typ: { // type
		nummer: 50,
		name: 'verbandsfreie-gemeinde'

		// 50: 'verbandsfreie-gemeinde'
		// 51: 'amt'
		// 52: 'samtgemeinde'
		// 53: 'verbandsgemeinde'
		// 54: 'verwaltungsgemeinschaft'
		// 55: 'kirchspielslandgemeinde'
		// 56: 'verwaltungsverband'
		// 57: 'vg-trägermodell'
		// 58: 'erfüllende-gemeinde'
	}
}
```

### `gemeinde`

```js
{
	ebene: { // federal layer
		nummer: 6,
		name: 'gemeinde'
	},
	name: 'Prezelle',
	stand: '2017-03-30T22:00:00.000Z', // as of …, [Date() Object]
	weiteres: '', // additional information
	'schlüssel': { // ids
		nummer: '033545403020', // entity id
		land: '03',
		regierungsbezirk: '3',
		kreis: '54',
		gemeindeverband: '5403',
		gemeinde: '020'
	},
	typ: { // type
		nummer: 64,
		name: 'kreisangehörige-gemeinde'

		// 60: 'markt'
		// 61: 'kreisfreie-stadt'
		// 62: 'stadtkreis'
		// 63: 'stadt'
		// 64: 'kreisangehörige-gemeinde'
		// 65: 'gemeindefreies-gebiet-bewohnt'
		// 66: 'gemeindefreies-gebiet-unbewohnt'
		// 67: 'große-kreisstadt'
	},
	'fläche': 4167, // area in <ha>
	'bevölkerung': 439, // population
	'bevölkerung-männlich': 220, // male population (As a side note: I'm not an anti-feminist, this is just taken from the original dataset which somehow doesn't include female population since it could be derivated by subtracting the male population from the absolute population. This still stinks a bit, though.. fight patriarchy! :D)
	plz: { // zip code
		nummer: '29491', // zip code of the entire body (if it only has one zip code) or the seat of the administration (if it has more than one zip code)
		eindeutig: true // false if the gemeinde has multiple zip codes
	},
	gerichtsbarkeit: { // jurisdication
		oberlandesgerichtsbezirk: '2',
		landsgerichtsbezirk: '5',
		amtsgerichtsbezirk: '04'
	},
	finanzamtsbezirk: '2332', // tax authority district
	arbeitsagenturbezirk: '25115', // job center district
	bundestagswahlkreise: { // federal election constituency numbers
		von: 37, // from this constituency number
		bis: 37 // to this constituency number (range could contain gaps)
	}
}
```

## Build

The module contains a dataset as of `2017-03-18`. To re-generate the dataset or to generate a newer version of it, run `npm run build` in the project root.

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/gemeindeverzeichnis/issues).
