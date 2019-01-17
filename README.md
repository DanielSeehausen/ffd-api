
**NOTE:** Currently under construction! See clusterization branch (master is not up to date, and will remain in its current working state until the clusterization branch is ready to become master)

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
 - both the browser clients as well as the Nexus communicate with the API
   - the browser clients display the game, netstat, etc. and a provide a nice meatbag interface
   - the Nexus provides a waypoint through which all participant program traffic flows (it standardizes communication with the API by digesting messages from multiple 'user clients')

----
 # Contributing

- See the associated github project board or ask in slack field-yay-engineering channel if you aren't sure what to work on
- Project board works as follows:
  1. new issues will automatically create cards in the `To do` column. Try to make sure your card is associated with an issue
  2. if you select a card to work on, **make a branch** and edit the card with your github username. Then, move it to the `In progress` column manually. Please create and name a branch in relation to the card.
  3. once finished, submit a PR for `master <-- <your-branch>` and request **at least one reviewer!**. This will automatically move your card to the `PR ready` column. Merging into `master` requires one accepted pr review.
  4. **IMPORTANT** once approved, please merge or rebase with master on `<your-branch>`, then squash & merge your branch into `master`! If you aren't familiar with rebasing, please ask anyone else for some pairing on this - it is dank and keeps the git history clean and keeps us from goofing up with asynchronous work on the projects.
 
---- 
 ### API Contract
 
 - TBD/WIP


----
#### Other microservices that make up the FFD application
 
 - [browser clients](https://github.com/danielseehausen/ffd-browser-clients)

 - [Nexus and local clients](https://github.com/DanielSeehausen/ffd-nexus-and-local-clients)
 

 
 
