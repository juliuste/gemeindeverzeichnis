'use strict'

const data = require('.')

data()
.on('data', (item) => console.log(item.ebene.nummer, item.name))
.on('error', console.error)
