const config = require('../../../config.js')

const BASECOLORS = [
  'C0392B','E74C3C','9B59B6','008941',
  '8E44AD','2980B9','3498DB','1B4400',
  '512E5F','154360','0E6251','FEFFE6',
  'E67E22','D35400','BDC3C7','885578',
  '34495E','17202A','641E16','6F0062',
  '2ECC71','F1C40F','F39C12','5A0007',
  '145A32','7D6608','7E5109','A079BF',
  '1ABC9C','16A085','27AE60','A1C299',
  '1CE6FF','FF34FF','FF4A46','008941'
]

const schema = {
  id: null,
  color: '333333',
  writes: 0,
  errors: 0,
  time: 0
}
// TODO: all models need to be duplicated and given create methods so the main server can manage their creation
const Group = {

  create: (id) => {
    const group = {
      ...schema,
      id,
      color: BASECOLORS[id] || schema.color // provide random starting colors
    }
    conn.groups.set(group.id, group)
    return newGroupData
  }

  find: (id) => (
    conn.groups.get(id) || create(id)
  )

  incrementWrites: (id) => {
    const group = find(id)
    conn.groups.set(group.id, {...group, writes: group.writes + 1})
  }

  incrementErrors: (id) => {
    const group = find(id)
    conn.groups.set(group.id, {...group, errors: group.errors + 1})
  }

  addTime: (id, time) => {
    const group = find(id)
    const newTime = group.time + time
    conn.groups.set(group.id, {...group, time: newTime})
  }
}

module.exports = Group
