# osm-alpha-roads
Search the OpenStreetMap database for the longest route of roads, where the names of the roads start with consecutive letters.

Example: Entersweg - Fitzweg - Goldammerweg

# Install
```sh
git clone https://github.com/plepe/osm-alpha-roads
cd osm-alpha-roads
npm install
```

# Run
By default, the road database for Vienna, Austria will be loaded. Change the variable "bound" in download_data.js for a different area

```sh
node ./download_data.js # create a file data.json with all roads in the selected area
node ./index.js # calculate longest route. Be patient!
```
