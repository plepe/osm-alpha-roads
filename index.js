//// Configuration ////
// stop for routes with length n
const stopLength = 99

const fs = require('fs')

const buildNodesIndex = require('./src/buildNodesIndex')
const buildNamesIndex = require('./src/buildNamesIndex')
const findCrossNodes = require('./src/findCrossNodes')
const findCrossNodesAB = require('./src/findCrossNodesAB')
const buildCrossNamesAB = require('./src/buildCrossNamesAB')
const extendRoutes = require('./src/extendRoutes')

let data = JSON.parse(fs.readFileSync('data.json'))

// First build an index of all nodes with the list of road names as values
let nodesIndex = buildNodesIndex(data)

// Build an index of all names with the list of their nodes as values - not needed
let namesIndex = buildNamesIndex(data)

// Get a list of all nodes which have more than two ways (with different names)
let crossNodes = findCrossNodes(nodesIndex)

// Filter above list to nodes which have roads whose names start with consecutive names
let crossNodesAB = findCrossNodesAB(crossNodes)

// Now build the list of all names with the list of their nodes as values - but nly those which are remaining after filtering
let crossNamesAB = buildCrossNamesAB(crossNodes)

// list of all names in the database
let allNames = Object.keys(crossNamesAB)


// build the first list of routes - with only one member (all names are possible)
let routes
let newRoutes = allNames.map(name => [ name ])

// now try to extend all routes with an adjacent name
while (newRoutes.length) {
  routes = newRoutes

  if (routes[0].length === stopLength) {
    break
  }

  console.log('- found ' + routes.length + ' routes with ' + routes[0].length + ' segments')

  newRoutes = extendRoutes(routes, crossNamesAB, crossNodesAB)
}

// Final output
console.log('Longest route(s) have ' + routes[0].length + ' segments:')
routes.forEach(
  (route) => {
    console.log('* ' + route.join(' - '))
  }
)
