module.exports = function buildNameIndex (data) {
  let namesIndex = {}

  data.elements.forEach(
    (element) => {
      if (element.type !== 'way') {
        return
      }

      let name = element.tags.name || ''

//      if (!name) {
//        return
//      }

      if (!(name in namesIndex)) {
        namesIndex[name] = []
      }
      namesIndex[name] = namesIndex[name].concat(element.nodes)
    }
  )

  return namesIndex
}
