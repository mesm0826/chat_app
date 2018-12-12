import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken, RootEndpoints} from '../constants/app'
export default {
  // 友達リストを取得
  getFriendList() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.FRIEND_LIST}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIEND_LIST,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  // ログイン情報を取得
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.CURRENT_USER}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_CURRENT_USER,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  // ユーザーを検索
  getSearchUsers(search_string) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({ search_string: search_string })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_SEARCH_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  // 友達関係登録
  saveFriendship(targetUserName) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.FRIEND_LIST}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ targetUserName: targetUserName,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          location.href = RootEndpoints.ROOT
        } else {
          reject(res)
        }
      })
    })
  },
  // 友達関係の削除
  deleteFriendship(targetUserId) {
    return new Promise((resolve, reject) => {
      request
      .del(`${RootEndpoints.FRIEND_LIST}` + targetUserId)
      .set('X-CSRF-Token', CSRFToken())
      .end((error, res) => {
        if (!error && res.status === 200) {
          location.href = RootEndpoints.ROOT
        } else {
          reject(res)
        }
      })
    })
  },
}
