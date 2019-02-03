const fs = require('fs')

const buildNodesIndex = require('./src/buildNodesIndex')
const buildNamesIndex = require('./src/buildNamesIndex')

let data = JSON.parse(fs.readFileSync('data.json'))

let nodesIndex = buildNodesIndex(data)
let namesIndex = buildNamesIndex(data)

console.log(nodesIndex)
console.log(namesIndex)
