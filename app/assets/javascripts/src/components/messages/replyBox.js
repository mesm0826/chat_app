import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  // 初期状態はブランク
  get initialState() {
    return {
      value: '',
    }
  }
  // EnterKey押下
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)

      MessagesAction.saveMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      this.setState({
        value: '',
      })
    }
  }
  // 状態を更新する
  updateValue(e) {
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
