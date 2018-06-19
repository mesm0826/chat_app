import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import { ActionTypes } from '../constants/app'
import _ from 'lodash'

const UserList = {
  user: {
    id: 1,
    name: 'John Doek',
    profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
    lastMessageDate: 1424469794050,
  },
  user2: {
    id: 2,
    name: 'Ryan Clark',
    profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
    lastMessageDate: 1424423574000,
  },
  user3: {
    id: 3,
    name: 'Jilles Soeters',
    profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
    lastMessageDate: 1424352522080,
  },
}

class UserListStore extends BaseStore {

  getCurrentUserID() {
    return parseInt(Object.keys(UserList.user.id)[0], 10)
  }

  getUsers() {
    const allFriends = UserList
    const friendlist = []
    _.each(allFriends, (friend) => {
      friendlist.push({
        user_id: friend.id,
        user_name: friend.name,
        profilePicture: friend.profilePicture,
        lastMessageDate: friend.lastMessageDate,
      })
    })
    console.log('friendlist')
    console.log(friendlist)
    return friendlist
  }

}
const UserStore = new UserListStore()
UserStore.dispachToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    // case ActionTypes.GET_CURRENT_USER:
    //   MessagesStore.setMessage(action.json.messages)
    //   MessagesStore.emitChange()
    //   break

  }

  return true
})
export default UserStore
