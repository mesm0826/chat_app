import React from 'react'
import classNames from 'classnames'
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
// import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import _ from 'lodash'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    console.log('UserList.js:props')
    console.log(props)
    this.state = this.initialState
  }

  get initialState() {
    console.log('userList.js:initialState()')
    UsersAction.getUsers()
    return this.getStateFromStore()
  }

  getStateFromStore() {
    // const allMessages = MessagesStore.getAllChats()
    const allMessages = MessagesStore.getMessages()
    const messageList = allMessages || []
    console.log('userList.js:messageList')
    console.log(messageList)

    const allFriends = UserStore.getUsers()
    const friendlist = allFriends || []
    console.log('userList.js:friendlist')
    console.log(friendlist)

    const currentUser = UserStore.getCurrentUser()
    console.log('userList.js:currentUser')
    console.log(currentUser)

    return {
      messageList: messageList,
      friendlist: friendlist,
      currentUser: currentUser,
    }
  }
  componentWillMount() {
    console.log('userList.js:componentWillMount()')
    UserStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    console.log('userList.js:componentWillUnmount()')
    UserStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    console.log('userList.js:onStoreChange()')
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    console.log('userList.js:changeOpenChat(id)')
    UsersAction.changeOpenChat(id)
  }
  render() {
    // const openChatUserID = this.props.openChatUserID
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })
    this.state.friendlist.sort((a, b) => {
      if (a.updated_at > b.updated_at) {
        return -1
      }
      if (a.updated_at < b.updated_at) {
        return 1
      }
      return 0
    })

    const myFriendlist = _.map(this.state.friendlist, (friend) => {
      // const date = Utils.getNiceDate(friend.created_at)
      const date = 0

      // var statusIcon
      // if (message.lastMessage.from !== message.user.id) {
      //   statusIcon = (
      //     <i className='fa fa-reply user-list__item__icon' />
      //   )
      // }
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   statusIcon = (
      //     <i className='fa fa-circle user-list__item__icon' />
      //   )
      // }
      // var statusIcon
      // if (friend.lastMessage.user_id_from !== friend.user_id_from) {
      //   statusIcon = (
      //     <i className='fa fa-reply user-list__item__icon' />
      //   )
      // }
      // if (friend.lastAccess.updated_at < friend.lastMessage.updated_at) {
      //   statusIcon = (
      //     <i className='fa fa-circle user-list__item__icon' />
      //   )
      // }

      var isNewMessage = false
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   isNewMessage = message.lastMessage.from !== UserStore.user.id
      // }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.props.openChatUserID === friend.id,
      })

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, friend.id)}
          className={ itemClasses }
          key={ friend.id }
        >
          <div className='user-list__item__picture'>

          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.name }
              <abbr className='user-list__item__timestamp'>
                { date }
              </abbr>
            </h4>
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
UserList.propTypes = {
  openChatUserID: React.PropTypes.String,
}
export default UserList
