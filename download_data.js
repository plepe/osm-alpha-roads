const fs = require('fs')
const request = require('request')

let bounds = '48.4,16.2,48.6,16.4'
request(
  {
    method: 'POST',
    url: 'https://overpass-api.de/api/interpreter',
    body: '[out:json][bbox:' + bounds + '];way[highway][name];out body;'
  },
  (err, response, body) => {
    fs.writeFile('data.json', body, () => {})
  }
)
