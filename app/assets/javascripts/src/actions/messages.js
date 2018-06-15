import Dispatcher from '../dispatcher'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'UPDATE_OPEN_CHAT_ID',
      userID: newUserID,
    })
  },
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: 'SEND_MESSAGE',
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
}
