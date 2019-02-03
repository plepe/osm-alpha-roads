const fs = require('fs')

const buildNodesIndex = require('./src/buildNodesIndex')
const buildNamesIndex = require('./src/buildNamesIndex')
const findCrossNodes = require('./src/findCrossNodes')

let data = JSON.parse(fs.readFileSync('data.json'))

let nodesIndex = buildNodesIndex(data)
let namesIndex = buildNamesIndex(data)
let crossNodes = findCrossNodes(nodesIndex)

console.log(crossNodes)
