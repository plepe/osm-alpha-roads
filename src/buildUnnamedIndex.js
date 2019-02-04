module.exports = function buildUnnamedIndex (data) {
  let result = {}

  data.elements.forEach(
    (element) => {
      if (element.type !== 'way') {
        return
      }

      let name = element.tags.name

      if (name) {
        return
      }

      element.nodes.forEach(
        (nodeId) => {
          if (!(nodeId in result)) {
            result[nodeId] = []
          }
          result[nodeId].push(element.nodes)
        }
      )
    }
  )

  return result
}


