module.exports = function findCrossNodes (nodesIndex) {
  let result = {}

  for (let nodeId in nodesIndex) {
    let node = nodesIndex[nodeId]

    let roads = [...new Set(node)]

    if (roads.length > 1) {
      result[nodeId] = roads
    }
  }

  return result
}
