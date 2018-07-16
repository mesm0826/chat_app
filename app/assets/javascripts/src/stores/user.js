import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import { ActionTypes } from '../constants/app'

class UserListStore extends BaseStore {

  getChatUserID() {
    return this.get('chatUserId')
  }
  setChatUserID(userID) {
    this.set('chatUserId', userID)
  }
  getFriendList() {
    if (!this.get('friendList')) this.setFriendList([])
    return this.get('friendList')
  }
  setFriendList(array) {
    this.set('friendList', array)
  }

  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser({})
    return this.get('currentUser')
  }
  setCurrentUser(object) {
    this.set('currentUser', object)
  }

  getSearchUsers() {
    if (!this.get('searchUsers')) this.setSearchUsers([])
    return this.get('searchUsers')
  }
  setSearchUsers(array) {
    this.set('searchUsers', array)
  }

}
const UserStore = new UserListStore()
UserStore.dispachToken = Dispatcher.register(payload => {
  const action = payload.action
  let friendListResult = []
  let friendId = 0

  switch (action.type) {

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      UserStore.setChatUserID(action.userID)
      UserStore.emitChange()
      break

    case ActionTypes.GET_FRIEND_LIST:
      friendListResult = action.json.friendList
      UserStore.setFriendList(friendListResult)
      friendId = 0
      if (friendListResult.length > 0) {
        friendId = friendListResult[0].id
      }
      UserStore.setChatUserID(friendId)
      UserStore.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      UserStore.setCurrentUser(action.json.current_user)
      UserStore.emitChange()
      break

    case ActionTypes.GET_SEARCH_USERS:
      UserStore.setSearchUsers(action.json.search_users)
      UserStore.emitChange()
      break
  }

  return true
})
window.UserStore = UserStore
export default UserStore
