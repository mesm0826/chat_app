import React from 'react'
import classNames from 'classnames'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import _ from 'lodash'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    MessagesAction.getMessages()
    return this.getStateFromStore()
  }

  getStateFromStore() {
    // const allMessages = MessagesStore.getAllChats()
    const allMessages = MessagesStore.getMessages()
    console.log(allMessages)
    // MessagesAction.getMessages()

    const messageList = []
    _.each(allMessages, (message) => {
      // const messagesLength = message.messages.length
      messageList.push({
        lastMessage: message.content,
        lastAccess: message.updated_at,
        user: message.user_id_from,
      })
    })

    return {
      openChatUserID: MessagesStore.getOpenChatUserID(),
      messageList: messageList,
      friendlist: UserStore.getUsers(),
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }
  render() {
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })
    this.state.messageList.sort((a, b) => {
      if (a.lastMessage.updated_at > b.lastMessage.updated_at) {
        return -1
      }
      if (a.lastMessage.updated_at < b.lastMessage.updated_at) {
        return 1
      }
      return 0
    })

    const friendlist = this.state.friendlist.map((friend, index) => {
      const date = Utils.getNiceDate(friend.lastMessageDate)

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
        'user-list__item--active': this.state.openChatUserID === friend.user_id,
      })

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, friend.user_id)}
          className={ itemClasses }
          key={ friend.id }
        >
          <div className='user-list__item__picture'>
            <img src={ friend.profilePicture } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.user_name }
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
          { friendlist }
        </ul>
      </div>
    )
  }
}

export default UserList
