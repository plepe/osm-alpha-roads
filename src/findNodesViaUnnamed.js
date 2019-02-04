const unique = require('just-unique')

let cache = {}

module.exports = function findNodesViaUnnamed (name, nodes, unnamedIndex) {
  let result = nodes

  if (name in cache) {
    return cache[name]
  }

  nodes.forEach(
    (nodeId) => {
      result = result.concat(getFromUnnamed(nodeId, unnamedIndex))
    }
  )

  result = unique(result)
  
  // final recursion
  if (nodes.length === result.length) {
    cache[name] = result
  } else {
    result = findNodesViaUnnamed(name, result, unnamedIndex)
  }

  return result
}

function getFromUnnamed (nodeId, unnamedIndex) {
  let result = []

  if (nodeId in unnamedIndex) {
    unnamedIndex[nodeId].forEach(
      (way) => {
        result = result.concat(way)
      }
    )
  }

  return result
}
