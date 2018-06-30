import keyMirror from 'keyMirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGES: null,
  SAVE_MESSAGE: null,
  GET_CURRENT_USER: null,
  GET_USERS: null,
  GET_SEARCH_USERS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}` // eslint-disable-line
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  SEARCH_USERS: APIRoot + '/search_users',
}
