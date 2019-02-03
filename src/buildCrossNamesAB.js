module.exports = function findCrossNamesAB (data) {
  let result = {}

  for (let nodeId in data) {
    data[nodeId].forEach(
      (name) => {
        if (!(name in result)) {
          result[name] = []
        }

        result[name].push(nodeId)
      }
    )
  }

  return result
}
