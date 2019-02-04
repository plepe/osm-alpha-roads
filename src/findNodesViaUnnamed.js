const unique = require('just-unique')
const haversine = require('haversine')

let cache = {}

module.exports = function findNodesViaUnnamed (name, nodes, unnamedIndex, nodesGeom, maxDist) {
  let result = {}
  nodes.forEach(nodeId => result[nodeId] = 0)

  if (name in cache) {
    return cache[name]
  }

  nodes.forEach(
    (nodeId) => {
      let distances = getFromUnnamed(nodeId, unnamedIndex, nodesGeom, maxDist)
      copyShortestDistances(distances, result)
    }
  )

  cache[name] = result

  return result
}

function getFromUnnamed (nodeId, unnamedIndex, nodesGeom, maxDist, rec = []) {
  let result = {}

  if (nodeId in unnamedIndex) {
    let r = unnamedIndex[nodeId].map(
      (way) => {
        if (rec.includes(way)) {
          return {}
        }
        rec.push(way)

        let r = {}

        way.forEach(
          (otherNodeId) => {
            if (nodeId === otherNodeId) {
              return
            }

            let distance = haversine(nodesGeom[nodeId], nodesGeom[otherNodeId], { unit: 'meter', format: '{lon,lat}' })
            let o = {}
            o[otherNodeId] = distance
            copyShortestDistances(o, r, 0, maxDist)

            let next = getFromUnnamed(otherNodeId, unnamedIndex, nodesGeom, maxDist - distance, rec.slice())
            copyShortestDistances(next, r, distance, maxDist)
          }
        )

        return r
      }
    )

    r.map(r1 => copyShortestDistances(r1, result))
  }

  return result
}

function copyShortestDistances (from, to, offset=0, maxDist=9000) {
  for (let id in from) {
    let distance = from[id] + offset
    if (distance > maxDist) {
      continue
    }

    if ((id in to && distance < to[id]) ||
        (!(id in to))) {
      to[id] = distance
    }
  }
}
