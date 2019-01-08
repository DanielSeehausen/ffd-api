const Achievements = require('./achievements.js')
const config = require('../../config.js')

const schema = {
  id: null,
  color: '333333',
  writes: 0,
  errors: 0,
  time: 0
}


const Group = {

  save: (group) => {
    conn.groups.set(group.id, group)
  }

  create: (id) => {
    const group = {...schema, id}
    save(group)
    return newGroupData
  }

  find: (id) => {
    conn.groups.get(id) || create(id)
  }

  incrementWrites: (group) => {
    conn.groups.set(group.id, {...group, writes: group.writes + 1})
  }

  incrementErrors: (group) => {
    conn.groups.set(group.id, {...group, errors: group.errors + 1})
  }

  addTime: (group, time) => {
    const newTime = group.time + time
    conn.groups.set(group.id, {...group, time: newTime})
  }
}

module.exports = Group
