import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {

  // sendMessage(userID, message) {
  //   Dispatcher.handleViewAction({
  //     type: ActionTypes.SEND_MESSAGE,
  //     userID: userID,
  //     message: message,
  //     timestamp: +new Date(),
  //   })
  // },
  getMessages() {
    return new Promise((resolve, reject) => {
      console.log('promiseMessages')
      request
      .get('/api/messages')
      .end((error, res) => {
        if (!error && res.status === 200) {
          console.log('res.text')
          console.log(res.text)
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  saveMessage(message, user_id_to) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ message: message,
              user_id_to: user_id_to,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          console.log('res.text')
          console.log(res.text)
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
