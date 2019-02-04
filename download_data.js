const fs = require('fs')
const request = require('request')

let bounds = '48.1271,16.2488,48.2951,16.5152'
request(
  {
    method: 'POST',
    url: 'https://overpass-api.de/api/interpreter',
    body: '[out:json][bbox:' + bounds + '];way[highway];out body;>;out geom;'
  },
  (err, response, body) => {
    if (err) {
      throw (err)
    }

    fs.writeFile('data.json', body, () => {})
  }
)
