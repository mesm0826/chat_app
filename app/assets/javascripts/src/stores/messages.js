import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import { ActionTypes } from '../constants/app'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getMessages() {
    if (!this.get('messages')) this.setMessage([])
    return this.get('messages')
  }
  setMessage(array) {
    this.set('messages', array)
  }
}
const MessagesStore = new ChatStore()
MessagesStore.dispachToken = Dispatcher.register(payload => {
  const action = payload.action
  var messages
  var length
  var id

  switch (action.type) {

    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessage(action.json.messages)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      messages = MessagesStore.getMessages()
      length = messages.length
      id = 1
      if (length > 0) {
        id = messages[length - 1].id + 1
      }

      messages.push(
        {
          id: id,
          content: action.json.content,
          from_user_id: action.json.from_user_id,
          to_user_id: action.json.to_user_id,
          picture: '',
        }
      )
      MessagesStore.emitChange()
      break
    case ActionTypes.SAVE_IMAGE:
      messages = MessagesStore.getMessages()
      length = messages.length
      id = 1
      if (length > 0) {
        id = messages[length - 1].id + 1
      }

      messages.push(
        {
          id: id,
          picture: action.json.picture,
          from_user_id: action.json.from_user_id,
          to_user_id: action.json.to_user_id,
        }
      )
      MessagesStore.emitChange()
      break
  }

  return true
})
export default MessagesStore
