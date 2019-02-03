const fs = require('fs')

const buildNodesIndex = require('./src/buildNodesIndex')
const buildNamesIndex = require('./src/buildNamesIndex')
const findCrossNodes = require('./src/findCrossNodes')
const findCrossNodesAB = require('./src/findCrossNodesAB')

let data = JSON.parse(fs.readFileSync('data.json'))

let nodesIndex = buildNodesIndex(data)
let namesIndex = buildNamesIndex(data)
let crossNodes = findCrossNodes(nodesIndex)
let crossNodesAB = findCrossNodesAB(crossNodes)

console.log(crossNodesAB)
