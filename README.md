----
### This repo contains the node/express api for field-day. All to be hosted on: theAPI.link

for the browser clients server, see: https://github.com/danielseehausen/ffd-browser-clients
----

# Starting the server:
  - `npm start` is an alias of `npm run startall`
  - `npm run startall` will run on all cores
  - `npm run startone` will run on a single core
  - `node index.js -w #` will run using # cores (int)
  - see the scripts in `./package.json`

# Useful Resources:

- [Debugging Node Applications](https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4)
- Run `npm i && npm run watch` to start a hot reloading server that also connects to your chrome console
- The server accepts an _optional_ command line argument that will set the total number of groups. This only works with `npm start`: `npm start -- --groups=50`. Note that you need to add `--` before the groups arg. [See this StackOverflow Post for more information](https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script)
