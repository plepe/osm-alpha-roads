module.exports = function buildNodesGeom (data) {
  let result = {}

  data.elements.forEach(
    (element) => {
      if (element.type !== 'node') {
        return
      }

      result[element.id] = element
    }
  )

  return result
}
