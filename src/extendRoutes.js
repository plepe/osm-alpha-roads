const findNodesViaUnnamed = require('./findNodesViaUnnamed')

module.exports = function extendRoutes (routes, namesIndex, nodesIndex, unnamedIndex, nodesGeom) {
  let result = []
  let done = {}

  routes.forEach(
    (route) => {
      let name = route[route.length - 1]
      let lastChar = name.codePointAt(0)
      let nextChar = lastChar + 1
      let nodes = namesIndex[name]

      nodes = findNodesViaUnnamed(name, nodes, unnamedIndex, nodesGeom, 50)

      for (let otherName in namesIndex) {
        if (otherName.codePointAt(0) === nextChar) {
          let cross = namesIndex[otherName].filter(otherNodeId => otherNodeId in nodes)
          if (!cross.length) {
            continue
          }

          let distance = nodes[cross[0]]

          if (distance > 0) {
            route.push(distance)
          }

          let newRoute = route.concat([ otherName ])
          let newRouteStr = newRoute.join(';')

          if (!(newRouteStr in done)) {
            result.push(newRoute)
            done[newRouteStr] = true
          }
        }
      }
    }
  )

  return result
}
