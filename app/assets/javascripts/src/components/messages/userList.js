import React from 'react'
import ClassNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import { RootEndpoints } from '../../constants/app'
import _ from 'lodash'

class UserList extends React.Component {

  static get propTypes() {
    return {
      currentUser: React.PropTypes.object,
      openChatUserID: React.PropTypes.number,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    // メッセージ取得
    const allMessages = MessagesStore.getMessages()
    const messageList = allMessages || []
    // 友達リスト取得
    const allFriends = UserStore.getFriendList()
    const friendlist = allFriends || []

    return {
      messageList: messageList,
      friendlist: friendlist,
      editPath: RootEndpoints.EDIT_USER,
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  // ユーザー選択
  changeOpenChat(id) {
    // 相手のIDを取得
    MessagesAction.changeOpenChat(id)
    // メッセージ取得
    MessagesAction.getMessages(id)
  }
  // 閉じるボタン
  deleteFriendship(id) {
    const result = confirm('このユーザーをリストから削除しますか？(チャットの履歴は残ります。)')
    if (result) {
      UsersAction.deleteFriendship(id)
    }
  }
  render() {
    const myFriendlist = _.map(this.state.friendlist, (friend) => {
      var isNewMessage = false

      const itemClasses = ClassNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.props.openChatUserID === friend.id,
      })

      const edit_url = this.state.editPath + friend.id

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, friend.id)}
          className={ itemClasses }
          key={ friend.id }
        >
          <div className='user-list__item__picture'>
            <img src={friend.image_name.url}/>
          </div>
          <span
           onClick={ this.deleteFriendship.bind(this, friend.id)}
           className='fa fa-times-circle'></span>
          <div className='user-list__item__details'>
            <a href={edit_url} className='friend_name'>
              { friend.name }
            </a>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { myFriendlist }
        </ul>
      </div>
    )
  }
}
export default UserList
