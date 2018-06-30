import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'
import SearchUserRouter from './router/searchUser'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()

  const searchUserRouter = new SearchUserRouter()
  searchUserRouter.register()

  page({click: false})
})
