module.exports = function findCrossNodesAB (data) {
  let result = {}

  for (let nodeId in data) {
    let node = data[nodeId]

    let found = false
    node.forEach(
      (a, ai) => {
        // unnamed road - use all
        if (a.length === 0) {
          found = true
          return
        }

        let codeA = a.codePointAt(0)

        return node.forEach(
          (b, bi) => {
            if (ai === bi) {
              return codeA
            }

            let codeB = b.codePointAt(0)
            if (codeA === codeB + 1 || codeA === codeB - 1) {
              found = true
            }
          }
        )
      }
    )

    if (found) {
      result[nodeId] = node
    }
  }

  return result
}
