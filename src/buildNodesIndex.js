module.exports = function buildNodesIndex (data) {
  let nodesIndex = {}

  data.elements.forEach(
    (element) => {
      let name = element.tags.name

      element.nodes.forEach(
        (nodeId) => {
          if (!(nodeId in nodesIndex)) {
            nodesIndex[nodeId] = []
          }

          nodesIndex[nodeId].push(name)
        }
      )
    }
  )

  return nodesIndex
}
