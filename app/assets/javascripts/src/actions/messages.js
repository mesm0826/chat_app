import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  // 相手変更
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  // メッセージを取得
  getMessages(openChatUserID) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.MESSAGES}`)
      .query({ openChatUserID: openChatUserID })
      .end((error, res) => {
        if (!error && res.status === 200) {
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
  // メッセージをDBに登録
  saveMessage(message, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .set('Content-Type', 'application/json')
      .send({ message: message,
              to_user_id: to_user_id,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
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
  // 画像をDBに登録
  saveImage(file, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/save_image`)
      .set('X-CSRF-Token', CSRFToken())
      .field('to_user_id', to_user_id)
      .attach('image', file, file.name)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE,
            image: file.name,
            to_user_id,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
