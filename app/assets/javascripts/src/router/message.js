import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import UsersAction from '../actions/users'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.getCurrentUser, this.getFriendList)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  getCurrentUser(ctx, next) {
    UsersAction.getCurrentUser()
    next()
  }

  getFriendList(ctx, next) {
    UsersAction.getFriendList()
    next()
  }
}
