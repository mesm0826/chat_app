import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGES: null,
  SAVE_MESSAGE: null,
  GET_CURRENT_USER: null,
  GET_FRIEND_LIST: null,
  GET_SEARCH_USERS: null,
  SAVE_FRIENDSHIP: null,
  DELETE_FRIENDSHIP: null,
  SAVE_IMAGE: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  FRIEND_LIST: APIRoot + '/users',
  CURRENT_USER: APIRoot + '/current_user',
  SEARCH_USERS: APIRoot + '/search_users',
}
export const RootEndpoints = {
  ROOT: Root,
  FRIEND_LIST: Root + '/friendships/',
  EDIT_USER: Root + '/users/',
}
