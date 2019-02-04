module.exports = function buildNodesIndex (data) {
  let nodesIndex = {}

  data.elements.forEach(
    (element) => {
      if (element.type !== 'way') {
        return
      }

      let name = element.tags.name

      if (!name) {
        return
      }

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
