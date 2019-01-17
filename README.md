
**NOTE** Currently under construction! See clusterization branch (master is not up to date, and will remain in its current working state until the clusterization branch is ready to become master)

----
# Field Day API

 - is a node/express app that exposes an API
 - one of the microservices that makes up the flatiron field day architecture
 - owns the 'game state', including:
   - the state of the: board, groups, netstat
 - runs the websocket server, and emits tile updates to all connected clients
 - (WIP clusterization branch) uses Redis as the persistence layer
 - (WIP clusterization branch) has redis dockerized
 - (WIP clusterization branch) runs an intance of itself for every core on the host

----
 # Contributing

- See the associated github project board or ask in slack field-yay-engineering channel
 
---- 
 ### API Contract
 
 - TBD/WIP


----
#### Other microservices that make up the FFD application
 
 - [for the browser clients, click here](https://github.com/danielseehausen/ffd-browser-clients)

 - [for the nexus and local clients, click here](https://github.com/DanielSeehausen/ffd-nexus-and-local-clients)
 

 
 
