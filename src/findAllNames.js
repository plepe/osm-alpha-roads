const unique = require('just-unique')

module.exports = function allNames (data) {
  let result = []

  for (let k in data) {
    result = result.concat(data[k])
  }

  result = unique(result)

  return result
}
