import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import { ActionTypes } from '../constants/app'
// import _ from 'lodash'

// const UserList = {
//   user: {
//     id: 1,
//     name: 'John Doek',
//     profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
//     lastMessageDate: 1424469794050,
//   },
//   user2: {
//     id: 2,
//     name: 'Ryan Clark',
//     profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//     lastMessageDate: 1424423574000,
//   },
//   user3: {
//     id: 3,
//     name: 'Jilles Soeters',
//     profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//     lastMessageDate: 1424352522080,
//   },
// }

class UserListStore extends BaseStore {

  // getCurrentUserID() {
  //   // return parseInt(Object.keys(UserList.user.id)[0], 10)
  //   return 1
  // }

  // getUsers() {
  //   const allFriends = UserList
  //   const friendlist = []
  //   _.each(allFriends, (friend) => {
  //     friendlist.push({
  //       user_id: friend.id,
  //       user_name: friend.name,
  //       profilePicture: friend.profilePicture,
  //       lastMessageDate: friend.lastMessageDate,
  //     })
  //   })
  //   console.log('friendlist')
  //   console.log(friendlist)
  //   return friendlist
  // }
  getOpenChatUserID() {
    const users = this.getUsers()
    console.log('store:getOpenChatUserID()')
    console.log('users')
    console.log(users)
    if (users.length > 0) {
      this.setChatUserID(users[0].id)
    }
  }

  // setter,getter
  getUsers() {
    console.log('store:getUsers()')
    if (!this.get('users')) this.setUser([])
    return this.get('users')
  }
  setUser(array) {
    console.log('store:setUsers()')
    this.set('users', array)
  }

  getCurrentUser() {
    console.log('store:getCurrentUser()')
    if (!this.get('current_user')) this.setCurrentUser([])
    return this.get('current_user')
  }
  setCurrentUser(array) {
    console.log('store:setCurrentUser()')
    this.set('current_user', array)
  }

  getChatUserID() {
    console.log('store:getChatUserID()')
    if (!this.get('chat_user_id')) this.setChatUserID([])
    return this.get('chat_user_id')
  }
  setChatUserID(array) {
    console.log('store:setChatUserID()')
    this.set('chat_user_id', array)
  }

  getSearchUsers() {
    console.log('store:getSearchUsers()')
    if (!this.get('search_users')) this.setSearchUsers([])
    return this.get('search_users')
  }
  setSearchUsers(array) {
    console.log('store:setSearchUsers()')
    this.set('search_users', array)
  }

}
const UserStore = new UserListStore()
UserStore.dispachToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      UserStore.setChatUserID(action.userID)
      console.log('UPDATE_OPEN_CHAT_ID')
      console.log(action.userID)
      // messages[openChatID].lastAccess.currentUser = +new Date()
      UserStore.emitChange()
      break

    case ActionTypes.GET_USERS:
      UserStore.setUser(action.json.users)
      console.log('action.json.users')
      console.log(action.json.users)
      UserStore.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      UserStore.setCurrentUser(action.json.current_user)
      console.log('action.json.current_user')
      console.log(action.json.current_user)
      UserStore.emitChange()
      break

    case ActionTypes.GET_SEARCH_USERS:
      UserStore.setSearchUsers(action.json.search_users)
      console.log('action.json.search_users')
      console.log(action.json.search_users)
      UserStore.emitChange()
      break

  }

  return true
})
window.UserStore = UserStore
export default UserStore
