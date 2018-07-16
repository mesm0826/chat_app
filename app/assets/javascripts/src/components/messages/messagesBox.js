import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UserStore from '../../stores/user'
import _ from 'lodash'

class MessagesBox extends React.Component {

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
    // メッセージを取得
    const allMessages = MessagesStore.getMessages()
    var messages = allMessages || []
    // メッセージを作成日でソート
    messages = _.sortBy(messages, (message) => { return message.created_at })
    // ログインユーザーの情報を取得
    const currentUser = UserStore.getCurrentUser()
    // chatユーザー(相手)IDを取得
    const openChatUserID = this.props.openChatUserID
    return {
      messages: messages,
      currentUser: currentUser,
      openChatUserID: openChatUserID,
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

  render() {
    const messages = _.map(this.state.messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from_user_id === this.state.currentUser.id,
        'clear': true,
      })

      return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              {message.picture.url ? <img src={`${message.picture.url}`}/> : message.content}
            </div>
          </li>
        )
    })

    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox openChatUserID={this.state.openChatUserID}/>,
        </div>
      )
  }
}

export default MessagesBox
