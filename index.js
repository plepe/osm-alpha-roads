const fs = require('fs')

const buildNodesIndex = require('./src/buildNodesIndex')
const buildNamesIndex = require('./src/buildNamesIndex')
const findCrossNodes = require('./src/findCrossNodes')
const findCrossNodesAB = require('./src/findCrossNodesAB')
const buildCrossNamesAB = require('./src/buildCrossNamesAB')
const findAllNames = require('./src/findAllNames')
const extendRoutes = require('./src/extendRoutes')

let data = JSON.parse(fs.readFileSync('data.json'))

let nodesIndex = buildNodesIndex(data)
let namesIndex = buildNamesIndex(data)
let crossNodes = findCrossNodes(nodesIndex)
let crossNodesAB = findCrossNodesAB(crossNodes)
let crossNamesAB = buildCrossNamesAB(crossNodes)
let allNames = findAllNames(crossNodesAB)

let routes
let newRoutes = allNames.map(name => [ name ])

while (newRoutes.length) {
  routes = newRoutes
  newRoutes = extendRoutes(routes, crossNamesAB, crossNodesAB)
}

console.log('Longest route(s) have ' + routes[0].length + ' segments:')
routes.forEach(
  (route) => {
    console.log('* ' + route.join(' - '))
  }
)
