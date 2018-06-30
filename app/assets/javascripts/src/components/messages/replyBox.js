import React from 'react'
// import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UserStore from '../../stores/user'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    console.log('ReplyBox.js:props')
    console.log(props)
    this.state = this.initialState
  }
  // 初期状態はブランク
  get initialState() {
    console.log('ReplyBox.js:initialState()')
    return {
      value: '',
    }
  }
  // EnterKey押下
  handleKeyDown(e) {
    console.log('ReplyBox.js:handleKeyDown(e)')
    if (e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      const user_id_to = UserStore.getChatUserID()
      console.log('user_id_to')
      console.log(user_id_to)
      console.log('this.state.value')
      console.log(this.state.value)
      MessagesAction.saveMessage(this.state.value, user_id_to)
      this.setState({
        value: '',
      })
    }
  }
  // 状態を更新する
  updateValue(e) {
    console.log('ReplyBox.js:updateValue(e)')
    console.log('e.target.value')
    console.log(e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
