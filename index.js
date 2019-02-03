const fs = require('fs')
let data = JSON.parse(fs.readFileSync('data.json'))

let nodesIndex = {}
let namesIndex = {}

function buildIndex (data) {
  data.elements.forEach(
    (element) => {
      let name = element.tags.name
      if (!(name in namesIndex)) {
        namesIndex[name] = []
      }
      namesIndex[name] = namesIndex[name].concat(element.nodes)

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
}

buildIndex(data)
