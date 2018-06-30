import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import SearchUser from '../components/users/searchUser'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-search', SearchUser)
    next()
  }
}
