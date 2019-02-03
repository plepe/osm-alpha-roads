const fs = require('fs')

const buildNodesIndex = require('./src/buildNodesIndex')
const buildNamesIndex = require('./src/buildNamesIndex')
const findCrossNodes = require('./src/findCrossNodes')
const findCrossNodesAB = require('./src/findCrossNodesAB')
const findAllNames = require('./src/findAllNames')

let data = JSON.parse(fs.readFileSync('data.json'))

let nodesIndex = buildNodesIndex(data)
let namesIndex = buildNamesIndex(data)
let crossNodes = findCrossNodes(nodesIndex)
let crossNodesAB = findCrossNodesAB(crossNodes)
let allNames = findAllNames(crossNodesAB)

console.log(allNames)
