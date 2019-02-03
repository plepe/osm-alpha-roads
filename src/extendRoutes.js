module.exports = function extendRoutes (routes, namesIndex, nodesIndex) {
  let result = []
  let done = {}

  routes.forEach(
    (route) => {
      let name = route[route.length - 1]
      let lastChar = name.codePointAt(0)
      let nextChar = lastChar + 1
      let nodes = namesIndex[name]

      for (let otherName in namesIndex) {
        if (otherName.codePointAt(0) == nextChar) {
          let cross = namesIndex[otherName].filter(otherNodeId => nodes.includes(otherNodeId))
          if (!cross.length) {
            continue
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
