import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UserStore from '../../stores/user'
// import Utils from '../../utils'
import _ from 'lodash'

class MessagesBox extends React.Component {

  // コンストラクタ
  constructor(props) {
    super(props)
    console.log('MessagesBox.js:props')
    console.log(props)
    this.state = this.initialState
  }
  // 初期状態
  get initialState() {
    console.log('MessagesBox.js:initialState()')
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
    return this.getStateFromStore()
  }
  // Storeから現在の状態を取得する
  getStateFromStore() {
    console.log('MessagesBox.js:getStateFromStore()')
    // 引数(chat_id)のmessage情報を返す
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
    const allMessages = MessagesStore.getMessages()
    const messages = allMessages || []
    const currentUser = UserStore.getCurrentUser()
    console.log('MessagesBox.js:currentUser')
    console.log(currentUser)
    return {
      messages: messages,
      currentUser: currentUser,
    }
  }

  componentWillMount() {
    console.log('MessagesBox.js:componentWillMount()')
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    console.log('MessagesBox.js:componentWillUnmount()')
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  // Storeから取得した状態をセットする
  onStoreChange() {
    console.log('MessagesBox.js:onStoreChange()')
    this.setState(this.getStateFromStore())
  }
  render() {
    console.log('MessagesBox.js')
    // const {messageList, currentUser} = this.props
    // const messagesLength = this.state.messages.length
    // const currentUserID = UserStore.user.id

    const messages = _.map(this.state.messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id_from === this.state.currentUser.id,
        'clear': true,
      })

      return (
          // <li key={ message.updated_at + '-' + message.id } className={ messageClasses }>
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.content }
            </div>
          </li>
        )
    })

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.user_id_from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.updated_at) {
    //     const date = Utils.getShortDate(lastMessage.updated_at)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}
// MessagesBox.propTypes = {
//   messageList: React.PropTypes.array,
//   currentUser: React.PropTypes.object,
// }

export default MessagesBox
