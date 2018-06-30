import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints} from '../constants/app'
export default {

  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },

  getUsers() {
    return new Promise((resolve, reject) => {
      console.log('promiseUser')
      request
      .get('/api/users')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      console.log('promiseCurrentUser')
      request
      .get('/api/current_user')
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
  getSearchUsers(search_string) {
    return new Promise((resolve, reject) => {
      console.log('search_string')
      console.log(search_string)
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({ search_string: search_string })
      // .query({ search_string: search_string })
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
}
